"use client";
import { useEffect, useState, use, onClick } from "react";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { and, desc, eq, getTableColumns, sql } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";
import ExpenseListTable from "../_components/ExpenseListTable";
import { ArrowLeft, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EditBudget from "../_components/EditBudget";

function ExpensesScreen({ params }) {
  const resolvedParams = use(params);

  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState(null);
  const [expensesList, setExpensesList] = useState([]);
  const route = useRouter();

  useEffect(() => {
    if (user && resolvedParams?.id) {
      getBudgetInfo();
    }
  }, [user, resolvedParams?.id]);

  // Get Budget Info
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
    getExpensesList(Number(resolvedParams.id));
  };

  // Get Latest Expenses
  const getExpensesList = async (budgetId) => {
    const result = await db
      .select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, budgetId))
      .orderBy(desc(Expenses.id));

    setExpensesList(result || []);
  };
  const deleteBudget = async () => {
    const deleteExpenseResult = await db
      .delete(Expenses)
      .where(eq(Expenses.budgetId, resolvedParams.id))
      .returning();

    if (deleteExpenseResult) {
      const result = await db
        .delete(Budgets)
        .where(eq(Budgets.id, resolvedParams.id))
        .returning();
    }
    toast("Budget Deleted!");
    route.replace("/dashboard/budgets");
  };

  return (
    <div className="p-10 ">
      <div className="flex justify-between items-center">
  {/* Left Side */}
  <span className="flex items-center gap-2">
    <ArrowLeft
      onClick={() => route.back()}
      className="w-6 h-6 cursor-pointer"
    />

    <h2 className="text-2xl font-bold">My Expenses</h2>
  </span>

  {/* Right Side */}
  <div className="flex gap-2 items-center">
    <EditBudget budgetInfo={budgetInfo}
      refreshData={()=>getBudgetInfo()}
    />

    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="flex gap-2" variant="destructive">
          Delete <Trash />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This will permanently
            delete your Budget along with expenses and remove your
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            className="bg-red-600 hover:bg-red-900"
            onClick={() => deleteBudget()}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</div>

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
          budgetInfo={budgetInfo}
        />
      </div>
      <div className="mt-4">
        <h2 className="font-bold text-lg">Latest Expenses</h2>
        <ExpenseListTable
          expensesList={expensesList}
          refreshData={() => getBudgetInfo()}
        />
      </div>
    </div>
  );
}

export default ExpensesScreen;
