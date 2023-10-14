import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';

const PieChartComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch the top 5 products with the greatest counts from your Spring Boot backend.
    axios
      .get('http://localhost:8082/api/top-products')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF8080'];

  return (
  <div className="widgetSm">
        <span className="widgetSmTitle">les 5 produits les mieux vendu</span>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="count"
          nameKey="productName"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;
