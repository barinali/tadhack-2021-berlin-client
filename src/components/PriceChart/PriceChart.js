import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  Tooltip,
  Label,
  ResponsiveContainer
} from "recharts";

const colors = [
  '#e8c1a0',
  '#f47560',
  '#f1e15b',
  '#e8a838',
  '#61cdbb',
  '#97e3d5',
  "#8dd3c7",
  "#ffffb3",
  "#bebada",
  "#fb8072",
  "#80b1d3",
  "#fdb462",
  "#b3de69",
  "#fccde5",
  "#d9d9d9",
  "#bc80bd",
  "#ccebc5",
  "#ffed6f"
];

export default function PriceChart({ data = [] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
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
        <YAxis tickFormatter={value => `$${value}`}>
          <Label value="Total cost" angle={-90} position="insideLeft" offset={1} />
        </YAxis>
        <Tooltip formatter={(value, name, props) => `$${value.toFixed(3)}`} />
        <Bar dataKey="totalCost" fill="#8884d8">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
