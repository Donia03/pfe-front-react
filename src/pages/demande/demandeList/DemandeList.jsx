import React, { useEffect, useState } from "react";
import axios from "axios";
import "./demandeList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Edit } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function DemandeList() {
  const [data, setData] = useState([]);
  const [clientData, setClientData] = useState([]);
  const userType = "Client";

  useEffect(() => {
    loadUsers();
  }, []);
  useEffect(() => {
      loadUserDemande();
    }, []);

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('id');
  const role = localStorage.getItem('role');

  const loadUserDemande = async () => {
      const result = await axios.get(`http://localhost:8082/api/demande/user/${userId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });
      setClientData(result.data);
    }

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8082/api/demande", {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });
    setData(result.data);
  }

  const handleDelete = (id) => {
    axios.delete("http://localhost:8082/api/demande/" + id, {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    }).then(r => {
      console.log("element deleted");
      setData(data.filter(item => item.id !== id));
    });
  };
  const getStatusClassName = (status) => {
      let className = "statusCell";
      if (status === 0) {
        className += " statusPending";
      } else if (status === 1) {
        className += " statusApproved";
      } else if (status === 2) {
        className += " statusRejected";
      }
      return className;
    };

  const columns = [
    {
      field: "nom",
      headerName: "Nom de Client",
      width: 180,
    },
    {
      field: "titre",
      headerName: "Titre",
      width: 180,
    },
    { field: "reference", headerName: "Reference", width: 140 },
    {
      field: "description",
      headerName: "Description",
      width: 240,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        let statusText = "";
        if (params.value === 0) {
          statusText = "En Cours";
        } else if (params.value === 1) {
          statusText = "Valider";
        } else if (params.value === 2) {
          statusText = "Refuser";
        }
        return (
                  <span className={getStatusClassName(params.value)}>
                    {statusText}
                  </span>
                );
      },
    },
    {
      field: " Statu",
      headerName: "Traiter Status",
      width: 160,
      renderCell: (params) => { 
        return (
          <>
            <Link to={"/demande/" + params.row.id}>
              <Edit className="ListdemandEdit"/>
            </Link>
         
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => { 
        return (
          <>
            <DeleteOutline
              className="ListdemandDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  /* {
      field: (
        <Link to="/demandeClient">
          <button className="userAdButton">Crèer Demande</button>
        </Link>
      ),
      width: 210,
    },*/
  ];
  const clientColumns = [
    {
      field: "nom",
      headerName: "Nom",
      width: 180,
    },
      {
        field: "titre",
        headerName: "Titre",
        width: 200,
      },
      { field: "reference", headerName: "Reference", width: 200 },
      {
        field: "description",
        headerName: "Description",
        width: 230,
      },
      {
        field: "status",
        headerName: "Status",  
        width: 150,
        renderCell: (params) => {
          let statusText = "";
          if (params.value === 0) {
            statusText = "En Cours";
          } else if (params.value === 1) {
            statusText = "Valider";
          } else if (params.value === 2) {
            statusText = "Refuser";
          }
          return (
                    <span className={getStatusClassName(params.value)}>
                      {statusText}
                    </span>
                  );
        },
      },

      {
        field: (
          <Link to="/demandeClient">
            <button className="ClientAddButton">Créer Demande</button>
          </Link>
        ),
        width: 210,
      },
    ];

  return (
    <div className="userList">
       <div className="titreDemande">
      <h1 className="titre">Liste Des Demandes</h1>
      </div>
     <br/><br/>
      <DataGrid
        rows={role === "Client" ? clientData:data}
        disableSelectionOnClick
        columns={role === "Client" ? clientColumns:columns}
        pageSize={8}
       /* checkboxSelection*/
      />
    </div>
  );
}
