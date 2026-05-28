import Link from "next/link";

function BudgetItem({ budget }) {
  const calculateProgresPerc = () => {
    const perc = (budget.totalSpend / budget.amount) * 100;
    return Math.min(Number(perc.toFixed(2)), 100);
  };

  // Prevent errors if budget is undefined during initial mount
  if (!budget) return null;

  const totalSpend = budget.totalSpend || 0;
  const remaining = budget.amount - totalSpend;
  const progressPerc = calculateProgresPerc();

  // Determine dynamic gradient based on budget consumption
  let progressGradient = "bg-gradient-to-r from-primary-light to-primary";
  if (progressPerc >= 100) {
    progressGradient = "bg-gradient-to-r from-red-500 to-rose-600 animate-pulse";
  } else if (progressPerc >= 75) {
    progressGradient = "bg-gradient-to-r from-amber-500 to-orange-500";
  }

  return (
    <Link
      href={`/dashboard/expenses/${budget?.id}`}
      className="block p-5 border border-slate-100 rounded-2xl bg-white shadow-2xs hover:shadow-lg hover:border-primary-light/30 transition-all duration-300 hover:scale-[1.02] cursor-pointer h-[170px] group relative overflow-hidden"
    >
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <h2 className="text-2xl p-3 bg-primary-soft/50 rounded-full group-hover:bg-primary-soft/80 transition-colors">
            {budget?.icon}
          </h2>
          <div>
            <h2 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{budget.name}</h2>
            <h2 className="text-sm text-gray-500">{budget.totalItem} Item</h2>
          </div>
        </div>
        <h2 className="font-bold text-primary text-lg">₹{budget.amount}</h2>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs text-slate-500">₹{totalSpend} Spend</h2>
          <h2 className="text-xs text-slate-500 font-semibold text-primary">₹{remaining} Remaining</h2>
        </div>
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div
            className={`h-2.5 rounded-full ${progressGradient} transition-all duration-500`}
            style={{
              width: `${progressPerc}%`,
            }}
          ></div>
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem;
