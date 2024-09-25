"use client";
export default function Page() {
  interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    expenses: Expense[];
  }
  interface Expense {
    id: number;
    user: User;
    userId: number;
    amount: number;
    category: string;
    date: Date;
    receipt?: Receipt;
    receiptId?: number;
    createdAt: Date;
  }
  interface Receipt {
    id: number;
    url: string;
    expense?: Expense;
    createdAt: Date;
  }

  return <div>oioi</div>;
}
