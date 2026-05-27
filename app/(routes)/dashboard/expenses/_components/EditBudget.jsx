"use client"
import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Input } from "@base-ui/react";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Budgets } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { db } from "@/utils/dbConfig";

function EditBudget({ budgetInfo, refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [name, setName] = useState();
  const [amount, setAmount] = useState();

  const { user } = useUser();

  useEffect(()=>{
    if(budgetInfo) {
      setEmojiIcon(budgetInfo?.icon)
      setAmount(budgetInfo?.amount)
      setName(budgetInfo?.name)
    }
  }, [budgetInfo])
  
  const onUpdateBudget=async()=>{
    const result=await db.update(Budgets).set({
      name:name,
      amount:amount,
      icon:emojiIcon,
    }).where(eq(Budgets.id, budgetInfo.id))
    .returning();

    if(result) {
      refreshData()
      toast('Budget Updated!')
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex gap-2 bg-amber-100 text-amber-600 hover:bg-amber-200">
            <PenBox /> Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  variant="outline"
                  className="text-3xl h-16 w-16"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
              </div>
              <div className="absolute z-50 mt-2">
                <EmojiPicker
                  open={openEmojiPicker}
                  onEmojiClick={(e) => {
                    setEmojiIcon(e.emoji);
                    setOpenEmojiPicker(false);
                  }}
                />
              </div>
              <div className="mt-2">
                <h2 className="text-black font-medium my-1">Budget Name</h2>
                <Input
                  placeholder="e.g. Shopping"
                  defaultValue={budgetInfo?.name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <h2 className="text-black font-medium my-1">Budget Amount</h2>
                <Input
                  type="number"
                  placeholder="e.g. ₹2000"
                  defaultValue={budgetInfo?.amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(name && amount)}
                onClick={() => onUpdateBudget()}
                className="mt-5 w-full bg-primary-light hover:bg-amber-300"
              >
                Update Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditBudget;
