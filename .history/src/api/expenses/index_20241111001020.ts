import { connectDB } from '../../lib/db';
import Expense from '../../models/Expense';

export async function GET() {
  try {
    await connectDB();
    const expenses = await Expense.find().sort({ date: -1 });

    return new Response(
      JSON.stringify(expenses),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Failed to fetch expenses' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const expenseData = await req.json();
    const expense = await Expense.create(expenseData);

    return new Response(
      JSON.stringify(expense),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Failed to create expense' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}