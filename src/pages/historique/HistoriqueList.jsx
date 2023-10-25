import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HistoriqueList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
export default function HistoriqueList() {
    const [data, setData] = useState([]);
    const [clientdata, setClientData] = useState([]);
      const userType = "Client";
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      const userId = localStorage.getItem('id');


        useEffect(() => {
                loadUserHistorique();
              }, []);


      useEffect(() => {
        loadUsers();
      }, []);

      const loadUserHistorique = async () => {
              const result = await axios.get(`http://localhost:8082/api/historiques/user/${userId}`, {
                headers: {
                  "Authorization": `Bearer ${token}`,
                }
              });
              setClientData(result.data);
            }

      const loadUsers = async () => {
        const result = await axios.get("http://localhost:8082/api/historiques", {
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        });
        setData(result.data);
      }




      const columns = [
        
        {
              field: "nom",
                headerAlign: 'center',
              headerName:  <strong>Nom</strong>,
              width: 180,
        },
        { field: "prenom",  headerAlign: 'center', headerName: <strong>Prenom</strong>, width: 180 },
        {
          field: "action",
            headerAlign: 'center',
          headerName: <strong>Action</strong>,
          width: 450,
        },
        { field: "date",   headerAlign: 'center',headerName:  <strong>Date</strong>, width: 190 },




      ];

      return (
        <div className="userList">
       <div className="titreHistorique">
      <h1 className="titre">Liste Des Historiques</h1>
      </div>
     <br/><br/>
          <DataGrid
            rows={role === "Client" ? clientdata : data}
            disableSelectionOnClick
            columns={columns}
            pageSize={20}
            /*checkboxSelection*/
          />
        </div>
      );
}