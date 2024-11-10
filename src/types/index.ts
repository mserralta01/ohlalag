export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  price: number;
  description: string;
  imageUrl: string;
  spotsAvailable: number;
  totalSpots: number;
}

export interface Registration {
  id: string;
  eventId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  paymentStatus: 'pending' | 'completed';
  createdAt: string;
}

export interface Expense {
  id: string;
  eventId?: string;
  category: string;
  amount: number;
  description: string;
  date: string;
  paymentMethod: string;
}

export type ExpenseCategory = 
  | 'Supplies'
  | 'Food & Beverages'
  | 'Venue'
  | 'Marketing'
  | 'Equipment'
  | 'Staff'
  | 'Other';