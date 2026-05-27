import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from "recharts";

function BarChartDashboard({ budgetList }) {
    return (
        <div className="border rounded-lg p-5">
            <h2 className="font-bold text-lg">Activity</h2>
            <BarChart
              width={500}
              height={300}
              data={budgetList}
              margin={{
                top:7
              }}
            >
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='totalSpend' stackId="a" fill='#10471D' />
                <Bar dataKey='amount' stackId="a" fill='#86C293' />
            </BarChart>
        </div>
    )
}

export default BarChartDashboard;