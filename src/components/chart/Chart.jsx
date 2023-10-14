import React from "react";
import "./chart.css"; // Import your custom styles after Bootstrap
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Chart({ title, data, clientKey, grid,reclamationKey,demandeKey,prospectKey,commandeKey }) {
  return (
    <div className="chart-container"> {/* Use a custom class */}
      <h3 className="chart-title">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#5550bd" />
          <Line type="monotone" dataKey={clientKey} stroke="#5550bd" />
          <Line type="monotone" dataKey={reclamationKey} stroke="#ff7300" />
          <Line type="monotone" dataKey={prospectKey} stroke="#3ced05" />
          <Line type="monotone" dataKey={demandeKey} stroke="#82ca9d" />
          <Line type="monotone" dataKey={commandeKey} stroke="#f15aeb" />

          <Tooltip />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
