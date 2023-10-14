import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import axios from "axios";
import {useEffect, useState} from "react";

export default function FeaturedInfo() {

const [stats,setStats] = useState({});

  const token = localStorage.getItem("token");

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    try {
      const result = await axios.get("http://localhost:8082/api/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = result.data;
      setStats(data);
      console.log("stats",stats)
    } catch (error) {
      console.error("Error fetching stats:", error);
      // Handle the error, e.g., display an error message to the user
    }
  };
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Nombre de Clients</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{stats.clientNbr}</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Nombre de Prospects</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{stats.prospectNbr}</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Nombre de Commandes</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{stats.commandeNbr}</span>
        </div>
      </div>
    </div>
  );
}
