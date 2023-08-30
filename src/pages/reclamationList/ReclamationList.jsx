import React, { useEffect, useState } from "react";
import axios from "axios";
import "./reclamationList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";

export default function ReclamationList() {
  const [data, setData] = useState([]);
  const userType = "Client";

  useEffect(() => {
    loadReclamations();
  }, []);

  const token = localStorage.getItem('token');

  const loadReclamations = async () => {
    const result = await axios.get("http://localhost:8082/api/reclamations", {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });
    setData(result.data);
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
    let className = "status-cell";
    if (status === 0) {
      className += " status-pending";
    } else if (status === 1) {
      className += " status-approved";
    } else if (status === 2) {
      className += " status-rejected";
    }
    return className;
  };

  const columns = [
    {
      field: "ref",
      headerName: "Référence",
      width: 140,
    },
    {
      field: "objet",
      headerName: "Objet de réclamation",
      width: 200,
    },
    {
      field: "preciser",
      headerName: "Précision",
      width: 140,
    },
    {
      field: "status",
      headerName: "Statut",
      width: 180,
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
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/detail/" + params.row.id}>
              <button className="productListEdit">Modifier</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
    {
      field: (
        <Link to="/reclamationClient">
          <button className="userAdButton">Créer une réclamation</button>
        </Link>
      ),
      width: 250,
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
