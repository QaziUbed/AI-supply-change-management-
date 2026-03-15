import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { validateApiAuth } from '@/lib/api-auth';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const SYSTEM_PROMPT = `You are a supply chain analyst assistant for an enterprise platform.
You have access to live inventory, demand forecast, supplier performance, and logistics data.

Your communication style:
- Friendly and professional, like a helpful coworker
- Data-driven — always reference numbers when available
- Proactive — suggest actions, not just observations  
- Concise — don't pad responses with filler words
- Use bullet points and structured formatting when listing data
- Never refer to yourself as "AI" or mention any model names

When given live database context, analyze it and give clear insights.
If no relevant data is available, provide helpful general guidance.
End with a clear recommendation or suggested next step.

Format responses with line breaks between sections. Use ** for bold key metrics.`;

async function fetchDatabaseContext(query: string): Promise<string> {
  const lowerQuery = query.toLowerCase();
  const contextParts: string[] = [];

  try {
    // Always fetch inventory summary for context
    if (lowerQuery.includes('inventory') || lowerQuery.includes('stock') || lowerQuery.includes('stockout') || lowerQuery.includes('reorder')) {
      const { data: inventory } = await supabase
        .from('inventory')
        .select('quantity_on_hand, reorder_point, products(name, sku)')
        .order('quantity_on_hand', { ascending: true })
        .limit(10);

      if (inventory && inventory.length > 0) {
        const items = inventory.map((i: any) => {
          const product = (i.products as any);
          const status = i.quantity_on_hand <= i.reorder_point ? '⚠️ LOW' : '✅ OK';
          return `- ${product?.name || 'Unknown'} (${product?.sku || 'N/A'}): ${i.quantity_on_hand} units on hand, reorder at ${i.reorder_point} [${status}]`;
        }).join('\n');
        contextParts.push(`📦 LIVE INVENTORY DATA:\n${items}`);
      }
    }

    // Fetch demand forecasts
    if (lowerQuery.includes('forecast') || lowerQuery.includes('demand') || lowerQuery.includes('predict')) {
      const { data: forecasts } = await supabase
        .from('demand_forecasts')
        .select('predicted_quantity, confidence_level, forecast_date, products(name)')
        .order('forecast_date', { ascending: false })
        .limit(5);

      if (forecasts && forecasts.length > 0) {
        const items = forecasts.map((f: any) => {
          const product = (f.products as any);
          return `- ${product?.name || 'Unknown'}: Predicted ${f.predicted_quantity} units (${(f.confidence_level * 100).toFixed(0)}% confidence) for ${f.forecast_date}`;
        }).join('\n');
        contextParts.push(`📊 DEMAND FORECAST DATA:\n${items}`);
      }
    }

    // Fetch supplier info
    if (lowerQuery.includes('supplier') || lowerQuery.includes('vendor') || lowerQuery.includes('procurement')) {
      const { data: suppliers } = await supabase
        .from('suppliers')
        .select('name, performance_score, lead_time_days, reliability_rating')
        .order('performance_score', { ascending: false })
        .limit(5);

      if (suppliers && suppliers.length > 0) {
        const items = suppliers.map((s: any) => {
          return `- ${s.name}: Score ${((s.performance_score || 0) * 100).toFixed(1)}%, Lead Time ${s.lead_time_days || 'N/A'} days, Reliability ${((s.reliability_rating || 0) * 100).toFixed(0)}%`;
        }).join('\n');
        contextParts.push(`🏭 SUPPLIER PERFORMANCE:\n${items}`);
      }
    }

    // Fetch sales/shipment data
    if (lowerQuery.includes('sales') || lowerQuery.includes('revenue') || lowerQuery.includes('order') || lowerQuery.includes('shipment') || lowerQuery.includes('logistics')) {
      const { data: sales } = await supabase
        .from('sales_history')
        .select('quantity_sold, date, revenue')
        .order('date', { ascending: false })
        .limit(7);

      if (sales && sales.length > 0) {
        const totalSold = sales.reduce((sum: number, s: any) => sum + (s.quantity_sold || 0), 0);
        const totalRevenue = sales.reduce((sum: number, s: any) => sum + (s.revenue || 0), 0);
        contextParts.push(`💰 RECENT SALES (last ${sales.length} records):\nTotal units sold: ${totalSold}\nTotal revenue: $${totalRevenue.toLocaleString()}`);
      }
    }

    // Fetch AI insights
    if (lowerQuery.includes('insight') || lowerQuery.includes('alert') || lowerQuery.includes('risk') || lowerQuery.includes('recommend')) {
      const { data: insights } = await supabase
        .from('ai_insights')
        .select('category, insight_text, severity')
        .order('created_at', { ascending: false })
        .limit(5);

      if (insights && insights.length > 0) {
        const items = insights.map((ins: any) => `- [${ins.category}] ${ins.insight_text}`).join('\n');
        contextParts.push(`🧠 ACTIVE AI INSIGHTS:\n${items}`);
      }
    }

    // For general queries, always provide a summary
    if (contextParts.length === 0) {
      const [
        { count: productCount },
        { count: supplierCount },
        { data: lowStock }
      ] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('suppliers').select('*', { count: 'exact', head: true }),
        supabase.from('inventory').select('quantity_on_hand, reorder_point, products(name)')
          .filter('quantity_on_hand', 'lte', 'reorder_point' as any)
          .limit(5)
      ]);

      contextParts.push(`📋 SYSTEM OVERVIEW:\n- Total Products: ${productCount || 0}\n- Total Suppliers: ${supplierCount || 0}\n- Low Stock Items: ${lowStock?.length || 0}`);
    }
  } catch (error) {
    console.error('Database context fetch error:', error);
    contextParts.push('Note: Some database queries failed. Provide general guidance.');
  }

  return contextParts.join('\n\n');
}

export async function POST(req: Request) {
  try {
    // Validate authentication — reject unauthenticated requests
    const auth = await validateApiAuth();
    if (!auth.authenticated) return auth.response;

    const { messages } = await req.json();
    const lastUserMessage = messages[messages.length - 1]?.content || '';

    // Fetch relevant database context
    const dbContext = await fetchDatabaseContext(lastUserMessage);

    // Check if Gemini API key is available
    const geminiKey = process.env.GEMINI_API_KEY;

    if (geminiKey) {
      // Use Google Gemini for real AI responses
      const genAI = new GoogleGenerativeAI(geminiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      const conversationHistory = messages.slice(-6).map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));

      // Build the prompt with database context
      const contextPrompt = `${SYSTEM_PROMPT}

LIVE DATABASE CONTEXT (use this data to inform your response):
${dbContext}

Respond to the user's latest message. Be specific and reference the data above when relevant.`;

      const chat = model.startChat({
        history: conversationHistory.slice(0, -1),
        systemInstruction: contextPrompt,
      });

      const result = await chat.sendMessage(lastUserMessage);
      const response = result.response.text();

      return NextResponse.json({ content: response });
    } else {
      // Fallback: Smart rule-based responses using database data
      let response = generateSmartResponse(lastUserMessage, dbContext);

      // Simulate slight delay for natural feel
      await new Promise(resolve => setTimeout(resolve, 800));

      return NextResponse.json({ content: response });
    }
  } catch (error) {
    console.error('AI Chat Error:', error);
    return NextResponse.json(
      { content: "I encountered an error processing your request. Please try again or rephrase your question." },
      { status: 200 }
    );
  }
}

function generateSmartResponse(query: string, dbContext: string): string {
  const lower = query.toLowerCase();

  if (lower.includes('stockout') || lower.includes('low stock') || lower.includes('running low')) {
    return `**Inventory Risk Check**\n\nHere's what the current data shows:\n\n${dbContext}\n\n**Recommendation:** Take a look at items marked LOW and consider placing reorder requests soon. Bumping safety stock by 15% on high-velocity items would help prevent future gaps.`;
  }

  if (lower.includes('forecast') || lower.includes('demand') || lower.includes('predict') || lower.includes('trend')) {
    return `**Demand Overview**\n\n${dbContext}\n\n**Takeaway:** Based on current trends, it's worth adjusting procurement plans to match predicted demand spikes. Pre-ordering high-confidence items could lock in better pricing.`;
  }

  if (lower.includes('supplier') || lower.includes('vendor')) {
    return `**Supplier Breakdown**\n\n${dbContext}\n\n**Suggestion:** Double down on your top performers. For lower-scoring vendors, consider having a performance review conversation or scouting backup options.`;
  }

  if (lower.includes('help') || lower.includes('what can you')) {
    return `**Here's what I can help with:**\n\n• **Inventory** — "What items are running low?"\n• **Forecasting** — "Show demand forecasts for next quarter"\n• **Suppliers** — "How are our suppliers doing?"\n• **Sales** — "What are recent sales trends?"\n• **Risks** — "Any supply chain risks I should know about?"\n\nJust type your question and I'll pull the relevant data.`;
  }

  return `**Here's what I found:**\n\n${dbContext}\n\n**Summary:** Pulled the latest data for "${query.slice(0, 50)}". Everything looks current.\n\n**Want to dig deeper?** Ask about specific inventory items, demand forecasts, or supplier metrics.`;
}
