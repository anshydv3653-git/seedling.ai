import { NextResponse } from 'next/server';
import { capturePayPalOrder } from '@/lib/paypal';
import { supabaseServer } from '@/lib/supabaseServer';

export async function POST(req: Request) {
  try {
    const { orderId, projectId, backerName, amount, message } = await req.json();

    const captureData = await capturePayPalOrder(orderId);

    if (captureData.status !== 'COMPLETED') {
      return NextResponse.json({ error: 'Payment capture was not completed' }, { status: 400 });
    }

    const { data: donation, error } = await supabaseServer
      .from('donations')
      .insert([
        {
          project_id: projectId,
          backer_name: backerName || 'Anonymous Founder',
          amount: Number(amount),
          paypal_order_id: orderId,
          message: message || '',
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, donation, captureData });
  } catch (error: any) {
    console.error('Capture backend error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}