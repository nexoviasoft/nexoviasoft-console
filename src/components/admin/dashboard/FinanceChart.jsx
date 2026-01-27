import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Defs,
  LinearGradient,
  CartesianGrid,
} from "recharts";
import { useGetFinanceTrendQuery } from "@/api/admin/dashboard/dashboardApi";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#121212] border border-[#EFFC76]/20 p-3 rounded-lg shadow-xl min-w-[120px]">
        <p className="text-white/60 mb-2 text-xs font-medium">{label}</p>
        <div className="flex items-center justify-between gap-4">
            <span className="text-white text-sm font-semibold">Income</span>
            <span className="text-[#EFFC76] text-sm font-bold">${payload[0].value.toLocaleString()}</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function FinanceChart({ period = "Yearly" }) {
  const { data: trendResp } = useGetFinanceTrendQuery(period);
  const apiData = trendResp?.data?.data;

  const data = Array.isArray(apiData) ? apiData : [];
  const barWidth = period === "Weekly" ? 48 : period === "Quarterly" ? 80 : 32;

  return (
    <div className="h-72 w-full mt-6">
      <div 
        className="w-full h-full overflow-x-auto pb-4"
        style={{ scrollbarWidth: 'thin' }}
      >
        <div style={{ 
          width: period === "Quarterly" ? "750%" : period === "Monthly" ? "250%" : "100%", 
          minWidth: period === "Weekly" ? "500px" : period === "Yearly" ? "700px" : "100%",
          height: "100%" 
        }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
              barSize={["Monthly", "Quarterly"].includes(period) ? 16 : barWidth}
            >
              <XAxis 
                dataKey="label" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12, fontWeight: 500 }} 
                dy={10}
                interval={["Monthly", "Quarterly"].includes(period) ? 0 : "preserveStartEnd"}
              />
              
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ fill: 'rgba(255,255,255,0.03)', radius: [4,4,4,4] }} 
              />
              
              {/* Background Track */}
              <Bar
                dataKey="income"
                data={data.map(d => ({ ...d, full: 100000 }))} // Normalized max reference
                fill="#ffffff"
                fillOpacity={0.05}
                radius={[4, 4, 4, 4]}
                tooltipType="none"
                isAnimationActive={false}
                position="center"
              />

              {/* Value Bar */}
              <Bar
                dataKey="income"
                fill="#EFFC76"
                radius={[4, 4, 4, 4]}
                className="hover:opacity-90 transition-opacity cursor-pointer"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
