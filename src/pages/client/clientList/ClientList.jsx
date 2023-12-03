import React, { useEffect} from "react";
import axios from "axios"
import "./clientList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Edit } from "@material-ui/icons";
import { PersonAdd } from "@material-ui/icons";

import { userRows } from "../../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import DeleteConfirmation from "../../userList/DeleteConfirmation";
import SuiviPopup from "../../userList/SuiviPopup";
export default function ClientList() {
  const [data, setData] = useState([]);
  const  userType = "Client";
  const [showSuiviPopup, setShowSuiviPopup] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [suiviText, setSuiviText] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const role = localStorage.getItem('role');

  useEffect( () => {
    loadUsers();
  }, [])


    const token = localStorage.getItem('token');
  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8082/api/usersByRole/"+userType,
    {
      headers: {
       "Authorization": `Bearer ${token}`,
      }
    });
    setData(result.data)
                         
  }

  console.log("on a setter data avec seData => ",data)

  const handleDelete = (id) => {
    setUserToDelete(id);
    setShowDeleteConfirmation(true);
  };
  const confirmDelete = () => {
      axios.delete("http://localhost:8082/api/user/" + userToDelete)
        .then(() => {
          console.log("User deleted:", userToDelete);
          setShowDeleteConfirmation(false);
          setUserToDelete(null);
          loadUsers();
        })
        .catch(error => {
          console.error("Error deleting user:", error);
        });
    };

    const handleCancelDelete = () => {
      setUserToDelete(null);
      setShowDeleteConfirmation(false);
    };

    const handleSuiviClick = (id, suivi) => {
      setSelectedUserId(id);
      setSuiviText(suivi); // Set the initial suivi text
      setShowSuiviPopup(true);
    };
  
  
    const handleSaveSuivi = () => {
      axios.post(`http://localhost:8082/api/userSuivi/${selectedUserId}`,
  
         {suiviText},
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          'Content-Type': 'application/json'
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
      headerAlign: 'center',
      headerName: <strong >Nom</strong>,
      width: 140,
    },
    { field: "prenom", headerAlign: 'center',  headerName:<strong >Prénom </strong>, width: 140 },
    {
      field: "email",
      headerAlign: 'center',
      headerName: <strong >Email</strong>,
      width: 230,
    },
      { field: "cin",headerAlign: 'center',  headerName: <strong >Cin</strong>, width: 140 },

      { field: "telephone",headerAlign: 'center',  headerName: <strong >Télephone</strong>, width: 200 },
   {
      field: "suivi",
      headerAlign: 'center',
      headerName: <strong >Fiche de suivie</strong>,
      width: 180,
      renderCell: (params) => {
        return (
          <>
         
           
            <i className="material-icons"  onClick={() => handleSuiviClick(params.row.id,params.row.suivi)}>event</i>  
            
          </>
        );
      },
    },
        {
      field: "action",
      headerAlign: 'center',
      headerName: <strong >Action</strong>,
      width: 120,
      renderCell: (params) => {
        return (
          <>
           {role === "Admin" && (
            <Link to={"/client/" + params.row.id}>
              <Edit className="clientListEdit"></Edit>
            </Link>
            )}
            <DeleteOutline

              className="clientListDelete"
              onClick={() => handleDelete(params.row.id)}

            />

          </>
        );
      },

    },

  
  ];

  return (
    <div className="userList">
      <div className="titreClient">
      <h1 className="titre">Liste Des Clients</h1>
      <br/>
      {role === "Admin" && (

               <Link to="/newClient">
               <button className="clientButton"> <PersonAdd></PersonAdd> Ajouter Client </button>
               </Link>
      )}

       </div>
       <br/>
      <DataGrid
        rows={data}
        disableSelectionOnClick 
        columns={columns}
        pageSize={8}
        /*checkboxSelection*/
      />
          {showSuiviPopup && (
        <SuiviPopup
          suiviText={suiviText}
          setSuiviText={setSuiviText}
          onSave={handleSaveSuivi}
          onCancel={handleCancelSuivi}
        />
      )}

        {showDeleteConfirmation && (
       <DeleteConfirmation
         showDeleteConfirmation={showDeleteConfirmation}
         confirmDelete={confirmDelete}
         handleCancelDelete={handleCancelDelete}
         userToDeleteData={data.find(user => user.id === userToDelete)} // Assuming each user has an 'id' field
       />
     )}
    </div>
  );
}
