import React, { PureComponent } from 'react';
import Typography from '@mui/material/Typography';
import { PieChart, Pie, Sector, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import mccData from '../../mocks/mcc.json';

const colors = [
  "#7fc97f",
  "#beaed4",
  "#fdc086",
  "#ffff99",
  "#386cb0",
  "#f0027f",
  "#bf5b17",
  "#666666"
];

export default function MCCPieChart({ data }) {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          {/* <Pie
            data={data01}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={60}
            fill="#8884d8"
          /> */}

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            fill="#82ca9d"
            allowEscapeViewBox
            label={({ name }) => mccData[name].countryName}
          >

            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value} numbers`, mccData[name].countryName]}
          />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}
