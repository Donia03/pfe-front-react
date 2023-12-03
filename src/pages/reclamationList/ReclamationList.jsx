import React, { useEffect, useState } from "react";
import axios from "axios";
import "./reclamationList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Forum  } from "@material-ui/icons";
import { Edit } from "@material-ui/icons";
import { Link } from "react-router-dom";
import DeleteReclamation from "./DeleteReclamation";
import CommentsPopup from "./CommentsPopup";

export default function ReclamationList() {
  const [data, setData] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showCommentsPopup, setShowCommentsPopup] = useState(false);
  const [commentsPopupData, setCommentsPopupData] = useState(null);

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
  };

  const loadReclamationsUser = async () => {
    const result = await axios.get(`http://localhost:8082/api/reclamations/user/${userId}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });
    setClientData(result.data);
  };

  const handleToggleComments = (rowId) => {
    openCommentsPopup(rowId);
  };

  const openCommentsPopup = async (rowId) => {
    try {
      const response = await axios.get(`http://localhost:8082/api/reclamation/${rowId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const rowData = response.data;
      console.log('reclamation',rowData)
      setCommentsPopupData(rowData);
      setShowCommentsPopup(true);
    } catch (error) {
      console.error('Error fetching reclamation data:', error);
    }
  };



  const handleCloseCommentsPopup = () => {
    setShowCommentsPopup(false);
  };

  const handleDelete = (id) => {
    setUserToDelete(id);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    axios.delete(`http://localhost:8082/api/reclamation/${userToDelete}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })
      .then(() => {
        console.log("User deleted:", userToDelete);
        setShowDeleteConfirmation(false);
        setUserToDelete(null);
        loadReclamations();
      })
      .catch(error => {
        console.error("Error deleting user:", error);
      });
  };

  const handleCancelDelete = () => {
    setUserToDelete(null);
    setShowDeleteConfirmation(false);
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
      headerAlign: 'center',
      headerName: <strong>Client</strong>,
      width: 150,
    },
    {
      field: "ref",
      headerAlign: 'center',
      headerName: <strong>Référence</strong>,
      width: 180,
    },
    {
      field: "objet",
      headerAlign: 'center',
      headerName:<strong> Objet de réclamation</strong>,
      width: 220,
    },
  /*  {
      field: "preciser",
      headerName:<strong> Précision</strong>,
      width: 240,
    },*/

    {
      field: "traiter status",
      headerAlign: 'center',
      headerName: <strong>Traiter reclamation</strong>,
      width: 200,
      renderCell: (params) => {
        return (

          <>
            <Link to={`/detail/${params.row.id}`} >
              <Edit className="ListreclaEdit" />
            </Link>

          </>

        );
      },
    },
     {
          field: "commentaire",
          headerAlign: 'center',
          headerName: <strong>Commentaire</strong>,
          width: 170,
          renderCell: (params) => {
                  return (
                      <Forum
                                  className="ListreclaEdit"
                                  onClick={() => handleToggleComments(params.row.id)}
                                />

                            );
                          },
          },
    {
      field: "action",
      headerAlign: 'center',
      headerName: <strong>Action</strong>,
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
     {
          field: "status",
          headerAlign: 'center',
          headerName: <strong>Statut</strong>,
          width: 160,
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
  ];

  const clientColumns = [
   /* {
      field: "nom",
      headerName: "Nom de Client",
      width: 180,
    },*/
    {
      field: "ref",
       headerAlign: 'center',
      headerName: <strong>Référence</strong>,
      width: 270,
    },
    {
      field: "objet",
       headerAlign: 'center',
      headerName: <strong>Objet de réclamation</strong>,
      width: 250,
    },
    {
      field: "preciser",
       headerAlign: 'center',
      headerName: <strong>Précision</strong>,
      width: 330,
    },
    {
      field: "status",
       headerAlign: 'center',
      headerName: <strong>Statut</strong>,
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
          field: "actions",
           headerAlign: "center",
          headerName: <strong>Commentaire</strong>,
          width: 180,
          renderCell: (params) => {
            return (
              <>

                <Forum
                  className="ListreclaEdit"
                  onClick={() => handleToggleComments(params.row.id)}


                />
              </>
            );
          },
        },
  /*  {
      field: (
        <Link to="/reclamationClient">
          <button className="btn btn-primary">Créer réclamation</button>
        </Link>
      ),
      width: 220,
    },*/
  ];

  return (
    <div className="userList">
      <div className="titreReclamation">
        <h1 className="titre">Liste Des Reclamations</h1>
      </div>
      <br/><br/>
      <DataGrid
        rows={role === "Client" ? clientData : data}
        disableSelectionOnClick
        columns={role === "Client" ? clientColumns : columns}
        pageSize={8}
      />
      {showDeleteConfirmation && (
        <DeleteReclamation
          showDeleteConfirmation={showDeleteConfirmation}
          confirmDelete={confirmDelete}
          handleCancelDelete={handleCancelDelete}
          userToDeleteData={data.find(user => user.id === userToDelete)} // Assuming each user has an 'id' field
        />
      )}
      {showCommentsPopup && (
        <CommentsPopup
          open={showCommentsPopup}
          onClose={() => setShowCommentsPopup(false)}
          id={commentsPopupData ? commentsPopupData.id : null}
          type={"Reclamation"}
          onCancel={() => {
            setCommentsPopupData(null);
            setShowCommentsPopup(false); // Close the popup and clear the data
          }}
        />
      )}
    </div>
  );
}
