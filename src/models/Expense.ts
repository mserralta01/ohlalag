import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  },
  category: {
    type: String,
    required: true,
    enum: ['Supplies', 'Food & Beverages', 'Venue', 'Marketing', 'Equipment', 'Staff', 'Other'],
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Expense || mongoose.model('Expense', expenseSchema);