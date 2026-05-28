"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/dbConfig";
import { eq, desc } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import ExpenseListTable from "./_components/ExpenseListTable";

function AllExpenses() {
  const { user } = useUser();
  const [expensesList, setExpensesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getAllExpenses();
    }
  }, [user]);

  const getAllExpenses = async () => {
    try {
      setLoading(true);
      const result = await db
        .select({
          id: Expenses.id,
          name: Expenses.name,
          amount: Expenses.amount,
          createdAT: Expenses.createdAT,
        })
        .from(Budgets)
        .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(Expenses.id));

      setExpensesList(result || []);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl">All Expenses</h2>
      <p className="text-slate-500 mt-2">View and manage your transaction history across all budgets.</p>
      
      <div className="mt-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-2xs">
        {loading ? (
          <div className="space-y-4">
            <div className="h-10 bg-slate-100 rounded-md animate-pulse" />
            <div className="h-20 bg-slate-50 rounded-md animate-pulse" />
            <div className="h-20 bg-slate-50 rounded-md animate-pulse" />
          </div>
        ) : expensesList.length > 0 ? (
          <ExpenseListTable
            expensesList={expensesList}
            refreshData={getAllExpenses}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400">
            <p className="text-lg font-medium">No expenses found</p>
            <p className="text-sm">Create a budget and log your first transaction to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllExpenses;
