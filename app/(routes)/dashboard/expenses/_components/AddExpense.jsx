import { Button } from "@/components/ui/button";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { Input } from "@base-ui/react";
import { useState } from "react";
import { toast } from "sonner";

function AddExpense({ budgetId, user, refreshData }) {
  const [name, setName] = useState();
  const [amount, setAmount] = useState();

  const addNewExpense = async () => {
    const result = await db
      .insert(Expenses)
      .values({
        name: name,
        amount: amount,
        budgetId: Number(budgetId),
        createdAT: new Date().toLocaleDateString(),
      })
      .returning({ insertedId: Expenses.id });

    if (result) {
      refreshData();
      toast("New Expense Added!");
    }
  };
  return (
    <div className="border p-5 rounded-lg ">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input
          placeholder="e.g. Bedroom Decor"
          onChange={(e) => setName(e.target.value)}
          className="border w-full"
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <Input
          placeholder="e.g. 1000"
          onChange={(e) => setAmount(e.target.value)}
          className="border w-full"
        />
      </div>
      <Button
        disabled={!(name && amount)}
        onClick={() => addNewExpense()}
        className="mt-3 w-full"
      >
        Add New Expense
      </Button>
    </div>
  );
}

export default AddExpense;
