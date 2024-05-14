import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const SalesByDayChart = ({ salesDataFormatted }) => {
  return (
    <LineChart width={600} height={300} data={salesDataFormatted}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="totalSales" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  );
}

export default SalesByDayChart;
