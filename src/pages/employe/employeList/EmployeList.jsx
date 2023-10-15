import React, { useEffect} from "react";
import axios from "axios"
import "./EmployeList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Edit } from "@material-ui/icons";
import { PersonAdd } from "@material-ui/icons";
import { userRows } from "../../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import DeleteConfirmation from "../../userList/DeleteConfirmation";
export default function ClientList() {
  const [data, setData] = useState([]);
  const  userType = "Employee";
  const token = localStorage.getItem('token')
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect( () => {
    loadUsers();
  }, []) 

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8082/api/usersByRole/"+userType,{
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


  const columns = [
    {
      field: "nom",
      headerName: "Nom",
      width: 140,
      
    },
    { field: "prenom", headerName: "Prenom", width: 140 },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
      { field: "cin", headerName: "Cin", width: 140 },

      { field: "telephone", headerName: "Tel", width: 140 },

  
   
        {
      field: "action",
      headerName: "Action",
      width: 120,


      renderCell: (params) => {
        return (
          <>
            <Link to={"/singleEmploye/" + params.row.id}>
              <Edit className="employeListEdit"/>
            </Link>
            <DeleteOutline
              className="employeListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    }, 
  ];
 
  return (
   
    <div className="userList">
      <div className="titreEmploye">
      <h1 className="titre">Liste Des Employes</h1>
     <br/>
      <Link to="newemploye">
     <button className="employeButton"> <PersonAdd></PersonAdd> Ajouter Employe </button> 
     </Link>
     </div>
      <br></br>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        /*checkboxSelection*/
      />
       <DeleteConfirmation 
         showDeleteConfirmation={showDeleteConfirmation}
         confirmDelete={confirmDelete}
         handleCancelDelete={handleCancelDelete}
         userToDeleteData={data.find(user => user.id === userToDelete)} // Assuming each user has an 'id' field
       />
    </div>
 
  );
}
