import React, { useEffect, useState} from "react";
import axios from "axios";
import "./widgetLg.css";

export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  const [commandes,setCommandes] = useState([]);

    const token = localStorage.getItem("token");

    useEffect(() => {
        getStats();
      }, []);

  const getStats = async () => {
      try {
        const result = await axios.get("http://localhost:8082/api/last-commandes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = result.data;
        console.log("stats",data)
        setCommandes(data);

      } catch (error) {
        console.error("Error fetching stats:", error);
        // Handle the error, e.g., display an error message to the user
      }
    };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh center" >Date</th>
          <th className="widgetLgTh center">Amount</th>
        </tr>
        {commandes.map((commande, index) => (
                  <tr key={index} className="widgetLgTr">
                    <td className="widgetLgUser">
                      <span className="widgetLgName">{commande.user}</span>
                    </td>
                    <td className="widgetLgDate">{commande.date}</td>
                    <td className="widgetLgAmount">{commande.price}</td>
                  </tr>
                ))}
      </table>
    </div>
  );
}
