// types/expense.ts
export interface Expense {
  id: string;
  description: string; 
  date: string;
  amount: number;
  type: "income" | "expense"; // Add this line
}

