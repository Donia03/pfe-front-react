import Chart from "../../components/chart/Chart";
import PieChart from "../../components/chart/PieChart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import axios from "axios";
import {useEffect, useState} from "react";


export default function Home() {


const [stats,setStats] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
      getStats();
    }, []);

const getStats = async () => {
    try {
      const result = await axios.get("http://localhost:8082/api/Mounthlystats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = result.data;
      console.log("stats",data)
      setStats(data);

    } catch (error) {
      console.error("Error fetching stats:", error);
      // Handle the error, e.g., display an error message to the user
    }
  };


  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={stats}
        title="User Analytics"
        grid
        clientKey="Client"
        reclamationKey="Reclamation"
        demandeKey="Demande"
        prospectKey="Prospect"
        commandeKey="Commande"
      />
      <PieChart/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
