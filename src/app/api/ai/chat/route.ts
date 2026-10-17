import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { validateApiAuth } from '@/lib/api-auth';
import {
  mockAiInsights,
  mockDemandForecasts,
  mockInventory,
  mockProducts,
  mockSalesHistory,
  mockSuppliers,
} from '@/lib/mock-data';

const SYSTEM_PROMPT = `You are a supply chain analyst assistant for an enterprise platform.
You have access to inventory, demand forecast, supplier performance, and logistics data.

Your communication style:
- Friendly and professional, like a helpful coworker
- Data-driven — always reference numbers when available
- Proactive — suggest actions, not just observations
- Concise — don't pad responses with filler words
- Use bullet points and structured formatting when listing data
- Never refer to yourself as "AI" or mention model names

When given context, analyze it and give clear insights.
If no relevant data is available, provide helpful general guidance.
End with a clear recommendation or suggested next step.

Format responses with line breaks between sections. Use ** for bold key metrics.`;

async function fetchDataContext(query: string): Promise<string> {
  const lowerQuery = query.toLowerCase();
  const contextParts: string[] = [];

  if (lowerQuery.includes('inventory') || lowerQuery.includes('stock') || lowerQuery.includes('stockout') || lowerQuery.includes('reorder')) {
    const items = mockInventory.slice().sort((a, b) => a.quantity_on_hand - b.quantity_on_hand).slice(0, 10).map((item) => {
      const product = mockProducts.find((p) => p.id === item.productId);
      const status = item.quantity_on_hand <= item.reorder_point ? '⚠️ LOW' : '✅ OK';
      return `- ${product?.name || 'Unknown'} (${product?.sku || 'N/A'}): ${item.quantity_on_hand} units on hand, reorder at ${item.reorder_point} [${status}]`;
    }).join('\n');
    contextParts.push(`📦 INVENTORY DATA:\n${items}`);
  }

  if (lowerQuery.includes('forecast') || lowerQuery.includes('demand') || lowerQuery.includes('predict')) {
    const items = mockDemandForecasts.slice(-5).map((forecast) => {
      const product = mockProducts.find((p) => p.id === forecast.productId);
      return `- ${product?.name || 'Unknown'}: Predicted ${forecast.predicted_quantity} units (${(forecast.confidence_level * 100).toFixed(0)}% confidence) for ${forecast.forecast_date}`;
    }).join('\n');
    contextParts.push(`📊 DEMAND FORECAST DATA:\n${items}`);
  }

  if (lowerQuery.includes('supplier') || lowerQuery.includes('vendor') || lowerQuery.includes('procurement')) {
    const items = mockSuppliers.map((supplier) => (
      `- ${supplier.name}: Score ${(supplier.performance_score * 100).toFixed(1)}%, Lead Time ${supplier.lead_time_days} days, Reliability ${(supplier.reliability_rating * 100).toFixed(0)}%`
    )).join('\n');
    contextParts.push(`🏭 SUPPLIER PERFORMANCE:\n${items}`);
  }

  if (lowerQuery.includes('sales') || lowerQuery.includes('revenue') || lowerQuery.includes('order') || lowerQuery.includes('shipment') || lowerQuery.includes('logistics')) {
    const totalSold = mockSalesHistory.reduce((sum, sale) => sum + sale.quantity_sold, 0);
    const totalRevenue = mockSalesHistory.reduce((sum, sale) => sum + sale.revenue, 0);
    contextParts.push(`💰 SALES SNAPSHOT:\nTotal units sold: ${totalSold}\nTotal revenue: $${totalRevenue.toLocaleString()}`);
  }

  if (lowerQuery.includes('insight') || lowerQuery.includes('alert') || lowerQuery.includes('risk') || lowerQuery.includes('recommend')) {
    const items = mockAiInsights.map((insight) => `- [${insight.category}] ${insight.insight_text}`).join('\n');
    contextParts.push(`🧠 ACTIVE INSIGHTS:\n${items}`);
  }

  if (contextParts.length === 0) {
    const lowStock = mockInventory.filter((item) => item.quantity_on_hand <= item.reorder_point);
    contextParts.push(
      `📋 SYSTEM OVERVIEW:\n- Total Products: ${mockProducts.length}\n- Total Suppliers: ${mockSuppliers.length}\n- Low Stock Items: ${lowStock.length}`
    );
  }

  return contextParts.join('\n\n');
}

export async function POST(req: Request) {
  try {
    const auth = await validateApiAuth();
    if (!auth.authenticated) return auth.response;

    const { messages } = await req.json() as {
      messages: Array<{ role: 'user' | 'assistant'; content: string }>;
    };
    const lastUserMessage = messages[messages.length - 1]?.content || '';
    const dataContext = await fetchDataContext(lastUserMessage);

    const geminiKey = process.env.GEMINI_API_KEY;

    if (geminiKey) {
      const genAI = new GoogleGenerativeAI(geminiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      const conversationHistory = messages.slice(-6).map((message) => ({
        role: message.role === 'user' ? 'user' : 'model',
        parts: [{ text: message.content }],
      }));

      const contextPrompt = `${SYSTEM_PROMPT}\n\nDATA CONTEXT:\n${dataContext}\n\nRespond to the user's latest message. Be specific and reference the data above when relevant.`;

      const chat = model.startChat({
        history: conversationHistory.slice(0, -1),
        systemInstruction: contextPrompt,
      });

      const result = await chat.sendMessage(lastUserMessage);
      return NextResponse.json({ content: result.response.text() });
    }

    const response = generateFallbackResponse(lastUserMessage, dataContext);
    return NextResponse.json({
      content: `**Gemini API key not configured** — using local mock analysis mode.\n\n${response}`,
    });
  } catch (error) {
    console.error('AI Chat Error:', error);
    return NextResponse.json(
      { content: 'I encountered an error processing your request. Please try again or rephrase your question.' },
      { status: 200 }
    );
  }
}

function generateFallbackResponse(query: string, dataContext: string): string {
  const lower = query.toLowerCase();

  if (lower.includes('stockout') || lower.includes('low stock') || lower.includes('running low')) {
    return `**Inventory Risk Check**\n\n${dataContext}\n\n**Recommendation:** Prioritize replenishment for items marked low and consider increasing safety stock for high-velocity SKUs.`;
  }

  if (lower.includes('forecast') || lower.includes('demand') || lower.includes('predict') || lower.includes('trend')) {
    return `**Demand Overview**\n\n${dataContext}\n\n**Recommendation:** Align procurement timing with forecast peaks and lock supply on high-confidence demand periods.`;
  }

  if (lower.includes('supplier') || lower.includes('vendor')) {
    return `**Supplier Breakdown**\n\n${dataContext}\n\n**Recommendation:** Lean on top performers and maintain backup options for slower vendors.`;
  }

  if (lower.includes('help') || lower.includes('what can you')) {
    return `**I can help with:**\n\n• **Inventory** — "What items are running low?"\n• **Forecasting** — "Show demand forecasts"\n• **Suppliers** — "How are our suppliers doing?"\n• **Sales** — "What are recent sales trends?"\n• **Risks** — "Any supply chain risks?"`;
  }

  return `**Current Snapshot**\n\n${dataContext}\n\n**Summary:** I pulled the latest available local data for your question.`;
}
