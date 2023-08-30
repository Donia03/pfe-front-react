import React, { useEffect, useState } from "react";
import axios from "axios";
import "./demandeList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function DemandeList() {
  const [data, setData] = useState([]);
  const userType = "Client";

  useEffect(() => {
    loadUsers();
  }, []);

  const token = localStorage.getItem('token');

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
      field: "titre",
      headerName: "Titre",
      width: 140,
    },
    { field: "reference", headerName: "Reference", width: 140 },
    {
      field: "description",
      headerName: "Description",
      width: 180,
    },
    {
      field: "status",
      headerName: "Status",
      width: 180,
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
      field: "action",
      headerName: "Action",
      width: 180,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/demande/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
    {
      field: (
        <Link to="/demandeClient">
          <button className="userAdButton">Create Demande</button>
        </Link>
      ),
      width: 250,
    },
  ];

  return (
    <div className="userList">
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
