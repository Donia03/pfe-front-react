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
      loadUsers();
    }, []);

    const token = localStorage.getItem('token');

    const loadUsers = async () => {
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
          console.log("element deleted");
          setData(data.filter(item => item.id !== id));
        });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
          field: "ref",
          headerName: "referance",
          width: 140,
        },
    {
      field: "objet",
      headerName: "Objet de reclamation",
      width: 200,
    },
    { field: "preciser", headerName: "Précision", width: 140 },
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
            return <span>{statusText}</span>;
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
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
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
