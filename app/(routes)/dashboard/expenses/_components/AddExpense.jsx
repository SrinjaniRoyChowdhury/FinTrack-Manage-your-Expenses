import { Button } from "@/components/ui/button";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { Input } from "@base-ui/react";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function AddExpense({ budgetId, user, refreshData, budgetInfo }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const addNewExpense = async () => {
    setLoading(true); 
    try {
      const result = await db
        .insert(Expenses)
        .values({
          name: name,
          amount: amount,
          budgetId: Number(budgetId),
          createdAT: new Date().toLocaleDateString(),
        })
        .returning({ insertedId: Expenses.id });

      const newExpenseAmount = Number(amount);
      setName('');
      setAmount('');
      
      if (result) {
        refreshData();
        toast("New Expense Added!");

        // Real-Time Over-Budget Warning Toast
        if (budgetInfo) {
          const currentTotalSpend = Number(budgetInfo.totalSpend || 0);
          const budgetLimit = Number(budgetInfo.amount);
          if (currentTotalSpend + newExpenseAmount > budgetLimit) {
            const exceededBy = (currentTotalSpend + newExpenseAmount) - budgetLimit;
            toast.error("OVER-BUDGET Alert!", {
              description: `This expense puts you ₹${exceededBy.toFixed(0)} over your budget of ₹${budgetLimit}!`,
              duration: 6000,
            });
          }
        }
      }
    } catch (error) {
      console.error(error);
      toast("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-5 rounded-lg ">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input
          placeholder="e.g. Bedroom Decor"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border w-full"
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <Input
          placeholder="e.g. 1000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border w-full"
        />
      </div>
      <Button
        disabled={!(name && amount) || loading} 
        onClick={() => addNewExpense()}
        className="mt-3 w-full"
      >
        {loading ? (
          <Loader className="animate-spin" />
        ) : (
          "Add New Expense"
        )}
      </Button>
    </div>
  );
}

export default AddExpense;