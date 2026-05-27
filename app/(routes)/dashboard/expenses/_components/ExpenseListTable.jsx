import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Trash } from "lucide-react";
import { toast } from "sonner";

function ExpenseListTable({ expensesList, refreshData }) {

    const deleteExpense=async(expense)=>{
        const result=await db.delete(Expenses)
        .where(eq(Expenses.id, expense.id))
        .returning();

        if(result) {
            toast('Expense Deleted!')
            refreshData()
        }
    }
  return (
    <div className="mt-3">
      <h2 className="font-bold text-lg ">Latest Budget</h2>
      {/* Header Row */}
      <div className="grid grid-cols-4 bg-slate-200 p-2 font-bold mt-3">
        <h2>Name</h2>
        <h2>Amount</h2>
        <h2>Date</h2>
        <h2>Action</h2>
      </div>
      
      {expensesList?.map((expense, index) => {
        return (
          <div key={expense.id || index} className="grid grid-cols-4 bg-slate-50 p-2 border-b">
            <h2>{expense.name}</h2>
            <h2>${expense.amount}</h2>
            <h2>{expense.createdAT}</h2>
            <h2>
              <Trash className="text-red-600 cursor-pointer hover:scale-105 transition-all"
                onClick={()=>deleteExpense(expense)} />
            </h2>
          </div>
        );
      })}
    </div>
  );
}

export default ExpenseListTable;