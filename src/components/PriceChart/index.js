import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";



export default function PriceChart(props) {
  const data = [
    {
      name: "Twilio",
      'Total cost': 2400,
    },
    {
      name: "MessageBird",
      'Total cost': 1398,
    },
    {
      name: "Telnyx",
      'Total cost': 9800,
    },
    {
      name: "Multiple Provider (AWA)",
      'Total cost': 3908,
    }
  ];

  return (
    <BarChart
      width={800}
      height={500}
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 5,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis tickFormatter={value => `$${value}`} />
      <Tooltip formatter={(value, name, props) => `$${value}`} />
      <Tooltip/>
      <Legend />
      <Bar dataKey="Total cost" fill="#8884d8" />
    </BarChart>
  );
}
