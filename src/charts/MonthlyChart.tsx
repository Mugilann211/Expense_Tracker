import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useExpenseContext } from "../context/ExpenseContext";
import { Expense } from "../types/expense";


// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MonthlyChart: React.FC = () => {
  const { expenses } = useExpenseContext();

  // Aggregate income, expense, and savings data by month
  const monthlyData: {
    [key: string]: { income: number; expense: number; savings: number };
  } = {};

  console.log("Expenses:", expenses);

  expenses.forEach((expense: Expense) => {
    const month = new Date(expense.date).toLocaleString("default", { month: "short" });
    if (!monthlyData[month]) {
      monthlyData[month] = { income: 0, expense: 0, savings: 0 };
    }

    if (expense.type === "income") {
      monthlyData[month].income += expense.amount;
      monthlyData[month].savings += expense.amount;
    } else if (expense.type === "expense") {
      monthlyData[month].expense += Math.abs(expense.amount); // Convert expense to positive
      monthlyData[month].savings -= Math.abs(expense.amount); // Deduct expense from savings
    }
  });

  // Prepare data for Chart.js
  const data = {
    labels: Object.keys(monthlyData), // Months
    datasets: [
      {
        label: "Income",
        data: Object.values(monthlyData).map((value) => value.income),
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Teal color for income
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Expense",
        data: Object.values(monthlyData).map((value) => value.expense),
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Red color for expenses
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Savings",
        data: Object.values(monthlyData).map((value) => value.savings),
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Blue color for savings
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly Income, Expenses, and Savings",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount ($)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MonthlyChart;
