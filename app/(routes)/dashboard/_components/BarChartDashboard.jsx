import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function BarChartDashboard({ budgetList = [] }) {
  // Map budgetList to ensure totalSpend and amount are valid numbers for Recharts
  const formattedData = budgetList.map((item) => ({
    name: item.name,
    totalSpend: Number(item.totalSpend || 0),
    amount: Number(item.amount || 0),
  }));

  return (
    <div className="border border-slate-100 rounded-2xl p-5 bg-white shadow-2xs">
      <h2 className="font-bold text-lg text-gray-900 mb-4">Activity - Budget vs Spend</h2>
      {formattedData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={formattedData}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `₹${value}`} />
            <Tooltip
              formatter={(value, name) => [`₹${Number(value).toLocaleString()}`, name]}
              contentStyle={{ backgroundColor: "#ffffff", borderRadius: "8px", border: "1px solid #e2e8f0" }}
            />
            <Legend wrapperStyle={{ paddingTop: "10px" }} />
            <Bar
              dataKey="totalSpend"
              name="Total Spend"
              fill="#346739"
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="amount"
              name="Total Budget"
              fill="#86b550"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[300px] flex items-center justify-center text-slate-400 text-sm">
          No budget data available
        </div>
      )}
    </div>
  );
}

export default BarChartDashboard;
