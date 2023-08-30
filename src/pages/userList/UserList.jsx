import React, { useEffect, useState } from "react";
import axios from "axios";
import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import SuiviPopup from "./SuiviPopup";

export default function UserList() {
  const [data, setData] = useState([]);
  const [showSuiviPopup, setShowSuiviPopup] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [suiviText, setSuiviText] = useState("");
  const token = localStorage.getItem('token');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8082/api/users", {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });
    setData(result.data);
  }

  const handleDelete = (id) => {
    axios.delete("http://localhost:8082/api/user/" + id).then(r => console.log("element deleted"));
    const posts = data.filter(item => item.id !== id);
    setData(posts);
  };


  const handleSuiviClick = (id, suivi) => {
    setSelectedUserId(id);
    setSuiviText(suivi); // Set the initial suivi text
    setShowSuiviPopup(true);
  };


  const handleSaveSuivi = () => {
    axios.post(`http://localhost:8082/api/userSuivi/${selectedUserId}`,

       suiviText,
    {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })
    .then(response => {
      console.log("Suivi text saved:", response.data);
      setShowSuiviPopup(false);
      setSuiviText("");
      loadUsers();
    })
    .catch(error => {
      console.error("Error saving suivi text:", error);
    });
  };

  const handleCancelSuivi = () => {
    setShowSuiviPopup(false);
    setSuiviText("");
  };

  const columns = [
    {
      field: "nom",
      headerName: "Nom",
      width: 125,
    },
    { field: "prenom", headerName: "Prenom", width: 135 },
    {
      field: "email",
      headerName: "Email",
      width: 190,
    },
    { field: "cin", headerName: "Identity", width: 85 },
    { field: "telephone", headerName: "Tel", width: 85 },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
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
      field: "suivi",
      headerName: "Suivi",
      width: 95,
      renderCell: (params) => {
        return (
          <>
            <button className="userListEdit" onClick={() => handleSuiviClick(params.row.id,params.row.suivi)}>
              Suivi
            </button>
          </>
        );
      },
    },
    { field: <Link to="/newUser"> <button className="userAdButton">Create User</button> </Link>, width: 170, },
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

      {showSuiviPopup && (
        <SuiviPopup
          suiviText={suiviText}
          setSuiviText={setSuiviText}
          onSave={handleSaveSuivi}
          onCancel={handleCancelSuivi}
        />
      )}
    </div>
  );
}
