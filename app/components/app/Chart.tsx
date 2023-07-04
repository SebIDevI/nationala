"use client";

import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Chart() {
  const data = [
    {
      name: "Lun",
      Total: Math.floor(Math.random() * 5000) + 1000,
      "Total Estimat": Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Mar",
      Total: Math.floor(Math.random() * 5000) + 1000,
      "Total Estimat": Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Mie",
      Total: Math.floor(Math.random() * 5000) + 1000,
      "Total Estimat": Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Joi",
      Total: Math.floor(Math.random() * 5000) + 1000,
      "Total Estimat": Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Vin",
      Total: Math.floor(Math.random() * 5000) + 1000,
      "Total Estimat": Math.floor(Math.random() * 5000) + 1000,
    },
  ];
  return (
    <div className="bg-accent-content rounded-lg mt-6 p-8 ps-3 text-neutral">
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="8 8" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip allowEscapeViewBox={{ x: false, y: false }} />
          <Legend align="right" verticalAlign="bottom" iconType="line" />
          <Line
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            activeDot={{ r: 0 }}
          />
          <Line
            type="monotone"
            dataKey="Total Estimat"
            stroke="#d77128"
            activeDot={{ r: 1 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
