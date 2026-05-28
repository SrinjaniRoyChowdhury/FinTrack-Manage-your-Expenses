import { PiggyBank, ReceiptText, Wallet } from "lucide-react";

function CardsInfo({ budgetList = [] }) {
  const totalBudget = budgetList.reduce(
    (sum, item) => sum + Number(item.amount ?? 0),
    0
  );

  const totalSpend = budgetList.reduce(
    (sum, item) => sum + Number(item.totalSpend ?? 0),
    0
  );

  return (
    <div>
      {budgetList?.length > 0 ? (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Total Budget Card */}
          <div className="p-7 border border-slate-100 bg-white/75 backdrop-blur-md rounded-2xl flex justify-between items-center shadow-2xs transition-all duration-300 hover:scale-[1.03] hover:shadow-md hover:border-primary-light/20 cursor-default group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary-light/5 rounded-full blur-xl group-hover:bg-primary-light/10 transition-colors" />
            <div className="relative z-10">
              <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Budget</h2>
              <h2 className="font-bold text-3xl text-gray-900 mt-1">₹{totalBudget}</h2>
            </div>
            <div className="relative z-10 p-3 bg-gradient-to-br from-primary-light to-primary rounded-2xl shadow-sm shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
              <PiggyBank stroke="white" className="w-7 h-7" />
            </div>
          </div>

          {/* Total Spend Card */}
          <div className="p-7 border border-slate-100 bg-white/75 backdrop-blur-md rounded-2xl flex justify-between items-center shadow-2xs transition-all duration-300 hover:scale-[1.03] hover:shadow-md hover:border-amber-500/20 cursor-default group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/10 transition-colors" />
            <div className="relative z-10">
              <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Spend</h2>
              <h2 className="font-bold text-3xl text-gray-900 mt-1">₹{totalSpend}</h2>
            </div>
            <div className="relative z-10 p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-sm shadow-orange-500/20 group-hover:scale-110 transition-transform duration-300">
              <ReceiptText stroke="white" className="w-7 h-7" />
            </div>
          </div>

          {/* No. of Budgets Card */}
          <div className="p-7 border border-slate-100 bg-white/75 backdrop-blur-md rounded-2xl flex justify-between items-center shadow-2xs transition-all duration-300 hover:scale-[1.03] hover:shadow-md hover:border-emerald-500/20 cursor-default group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-colors" />
            <div className="relative z-10">
              <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">No. of Budget</h2>
              <h2 className="font-bold text-3xl text-gray-900 mt-1">{budgetList.length}</h2>
            </div>
            <div className="relative z-10 p-3 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl shadow-sm shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
              <Wallet stroke="white" className="w-7 h-7" />
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-[140px] w-full bg-slate-100 animate-pulse rounded-2xl"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CardsInfo;