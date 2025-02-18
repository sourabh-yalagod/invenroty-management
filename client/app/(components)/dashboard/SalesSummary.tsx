import { useGetdashboardMetrixQuery } from "@/state/api";
import numeral from "numeral";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const SalesSummary = () => {
  const { data } = useGetdashboardMetrixQuery();
  const salesSummaryData = data?.salesSummary || [];
  // console.log("salesSummaryData : ", salesSummaryData);
  const highestSales = salesSummaryData?.reduce((ac, curr) => {
    return ac.totalValue > curr.totalValue ? ac : curr;
  }, salesSummaryData[0]);
  const highestSalesDay = highestSales?.date?.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="row-span-3 xl:row-span-6 h-fit bg-white shadow-md rounded-2xl flex flex-col justify-between p-3">
      <h1 className="font-semibold text-xl text-center mb-4">Sales Summary</h1>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={salesSummaryData}>
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 13 }}
            tickFormatter={(tick) => {
              return new Date(tick).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            }}
          />
          <YAxis
            tickFormatter={(value) => {
              // return `$${value.toLocaleString()}`;
              return numeral(value).format("$0.00a");
            }}
          />
          <Tooltip
            formatter={(value: number) => `$${value.toLocaleString("en-US")}`}
            labelFormatter={(label) =>
              new Date(label).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            }
          />
          <Legend />
          <Bar
            dataKey="totalValue"
            fill="#4F46E5"
            name="Total Value"
            barSize={10}
          />
        </BarChart>
      </ResponsiveContainer>
      <hr />
      <div className="flex text-xs text-gray-700 mt-3 justify-between items-center">
        <p>Days : {salesSummaryData.length || 0}</p>
        <p>Date : {highestSalesDay}</p>
      </div>
    </div>
  );
};

export default SalesSummary;
