import React, { useEffect, useState } from "react";
import axios from "axios";
import "./reclamationList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Edit } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";

export default function ReclamationList() {
  const [data, setData] = useState([]);
  const [clientData, setClientData] = useState([]);
  const userType = "Client";

  useEffect(() => {
    loadReclamations();
    loadReclamationsUser();
  }, []);

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('id');
  const role = localStorage.getItem('role');

  const loadReclamations = async () => {
    const result = await axios.get("http://localhost:8082/api/reclamations", {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });
    setData(result.data);
  }
  const loadReclamationsUser = async () => {
      const result = await axios.get(`http://localhost:8082/api/reclamations/user/${userId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });
      setClientData(result.data);
    }

  const handleDelete = (id) => {
    axios.delete("http://localhost:8082/api/reclamation/" + id, {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    }).then(r => {
      console.log("Element deleted");
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
      headerName: "Non de client",
      width: 180,
    },
    {
      field: "ref",
      headerName: "Référence",
      width: 180,
    },
    {
      field: "objet",
      headerName: "Objet de réclamation",
      width: 180,
    },
    {
      field: "preciser",
      headerName: "Précision",
      width: 240,
    },
    {
      field: "status",
      headerName: "Statut",
      width: 140,
      renderCell: (params) => {
        let statusText = "";
        if (params.value === 0) {
          statusText = "En Cours";
        } else if (params.value === 1) {
          statusText = "Validé";
        } else if (params.value === 2) {
          statusText = "Refusé";
        }
        return (
          <span className={getStatusClassName(params.value)}>
            {statusText}
          </span>
        );
      },
    },
    {
      field: "traiter status",
      headerName: "Traiter status", 
      width: 160,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/detail/" + params.row.id}>
              <Edit className="ListreclaEdit"/>
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
              className="ListreclaDelet"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  /*  {
      field: (
        <Link to="/reclamationClient">
          <button className="userAdButton">Créer une réclamation</button>
        </Link>
      ),
      width: 210,
    },*/
  ];
  const clientColumns = [
    {
      field: "nom",
      headerName: "Nom de Client",
      width: 180,
    },
      {
        field: "ref",
        headerName: "Référence",
        width: 200,
      },
      {
        field: "objet",
        headerName: "Objet de réclamation",
        width: 230,
      },
      {
        field: "preciser",
        headerName: "Précision",
        width: 230,
      },
      {
        field: "status",
        headerName: "Statut",
        width: 150,
        renderCell: (params) => {
          let statusText = "";
          if (params.value === 0) {
            statusText = "En Cours";
          } else if (params.value === 1) {
            statusText = "Validé";
          } else if (params.value === 2) {
            statusText = "Refusé";
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
          <Link to="/reclamationClient">
            <button className="reclatButton">Créer réclamation</button>
          </Link>
        ),
        width: 210,
      },
    ]; 
 
  return ( 
    <div className="userList">
       <div className="titreReclamation">
      <h1 className="titre">Liste Des Reclamations</h1>
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
