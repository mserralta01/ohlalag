import { createPaymentIntent } from '../lib/stripe';

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();
    const paymentIntent = await createPaymentIntent(amount);

    return new Response(JSON.stringify({ clientSecret: paymentIntent.client_secret }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error creating payment intent' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}