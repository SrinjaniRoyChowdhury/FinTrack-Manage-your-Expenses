"use client";
import { useEffect, useState, use } from "react";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { and, eq, getTableColumns, sql } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";

function ExpensesScreen({ params }) {
  const resolvedParams = use(params);

  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState(null);

  useEffect(() => {
    if (user && resolvedParams?.id) {
      getBudgetInfo();
    }
  }, [user, resolvedParams?.id]);

  const getBudgetInfo = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(
        and(
          eq(Budgets.createdBy, user.primaryEmailAddress?.emailAddress),
          eq(Budgets.id, Number(resolvedParams.id)),
        ),
      )
      .groupBy(Budgets.id);

    setBudgetInfo(result[0]);
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">My Expenses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
        )}
        <AddExpense
          budgetId={resolvedParams.id}
          user={user}
          refreshData={getBudgetInfo}
        />
      </div>
    </div>
  );
}

export default ExpensesScreen;
