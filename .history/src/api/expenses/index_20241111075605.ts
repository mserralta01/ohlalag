import { db_ops, Expense } from '../../lib/db';

export default async function handler(req: Request) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        const expenses = await db_ops.getAll<Expense>('expenses');
        // Sort expenses by date descending
        expenses.sort((a, b) => b.date.toMillis() - a.date.toMillis());
        return new Response(JSON.stringify(expenses), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });

      case 'POST':
        const expenseData = await req.json();
        
        // Validate required fields
        if (!expenseData.category || !expenseData.amount || !expenseData.description || !expenseData.date || !expenseData.paymentMethod) {
          return new Response('Missing required fields', { status: 400 });
        }

        // Create expense
        const expenseId = await db_ops.create<Expense>('expenses', {
          category: expenseData.category,
          amount: expenseData.amount,
          description: expenseData.description,
          date: expenseData.date,
          paymentMethod: expenseData.paymentMethod
        });

        return new Response(JSON.stringify({ id: expenseId }), {
          status: 201,
          headers: { 'Content-Type': 'application/json' }
        });

      default:
        return new Response('Method not allowed', { status: 405 });
    }
  } catch (error) {
    console.error('Expenses API error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
