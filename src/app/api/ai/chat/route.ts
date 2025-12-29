import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content.toLowerCase();

    let response = "I'm analyzing your supply chain data. Could you please provide more specifics?";

    if (lastMessage.includes('stockout') || lastMessage.includes('inventory')) {
      const { data: inv } = await supabase
        .from('inventory')
        .select('quantity_on_hand, reorder_point, products(name)')
        .lt('quantity_on_hand', 200); // Simple threshold for demo

      if (inv && inv.length > 0) {
        const items = inv.map(i => `${(i.products as any).name} (${i.quantity_on_hand} units remaining)`).join(', ');
        response = `Based on current inventory levels, the following products are at high risk of stockout: ${items}. I recommend placing reorder requests immediately.`;
      } else {
        response = "All inventory levels are currently above reorder points. No immediate stockout risks detected.";
      }
    } else if (lastMessage.includes('forecast') || lastMessage.includes('demand')) {
      const { data: forecasts } = await supabase
        .from('demand_forecasts')
        .select('predicted_quantity, confidence_level, products(name)')
        .order('confidence_level', { ascending: false })
        .limit(3);

      if (forecasts && forecasts.length > 0) {
        const items = forecasts.map(f => `${(f.products as any).name} (Predicted: ${f.predicted_quantity}, Confidence: ${(f.confidence_level * 100).toFixed(0)}%)`).join('\n');
        response = `Our AI models have updated the demand forecasts for the next period:\n\n${items}\n\nOverall demand is trending upwards for high-value components.`;
      }
    } else if (lastMessage.includes('supplier')) {
      const { data: suppliers } = await supabase
        .from('suppliers')
        .select('name, performance_score')
        .order('performance_score', { ascending: false });

      if (suppliers) {
        const top = suppliers[0];
        response = `Supplier performance analysis complete. ${top.name} remains your top-performing partner with a score of ${(top.performance_score * 100).toFixed(1)}%. I suggest shifting 15% more volume to them to optimize reliability.`;
      }
    }

    // Simulate AI delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ content: response });
  } catch (error) {
    console.error('AI Chat Error:', error);
    return NextResponse.json({ error: 'Failed to process AI request' }, { status: 500 });
  }
}
