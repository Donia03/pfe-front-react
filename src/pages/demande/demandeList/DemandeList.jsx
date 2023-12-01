import React, { useEffect, useState } from "react";
import axios from "axios";
import "./demandeList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Forum  } from "@material-ui/icons";
import { Edit } from "@material-ui/icons";
import { Link } from "react-router-dom";
import DeleteDemande from "./DeleteDemande";
import CommentsPopup from "../../reclamationList/CommentsPopup";

export default function DemandeList() {
  const [data, setData] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [reclamationToDelete, setReclamationToDelete] = useState(null);
   const [showCommentsPopup, setShowCommentsPopup] = useState(false);
    const [commentsPopupData, setCommentsPopupData] = useState(null);
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
  const handleToggleComments = (rowId) => {
    openCommentsPopup(rowId);
  };

  const openCommentsPopup = async (rowId) => {
    try {
      const response = await axios.get(`http://localhost:8082/api/demande/${rowId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const rowData = response.data;
      console.log('demande',rowData)
      setCommentsPopupData(rowData);
      setShowCommentsPopup(true);
    } catch (error) {
      console.error('Error fetching demande data:', error);
    }
  };

  const handleCloseCommentsPopup = () => {
    setShowCommentsPopup(false);
  };
  const handleDelete = (id) => {
    setReclamationToDelete(id);
    setShowDeleteConfirmation(true);
  };
  const confirmDelete = () => {
      axios.delete("http://localhost:8082/api/demande/" + reclamationToDelete)
        .then(() => {
          console.log("User deleted:", reclamationToDelete);
          setShowDeleteConfirmation(false);
          setReclamationToDelete(null);
          loadUsers();
        })
        .catch(error => {
          console.error("Error deleting user:", error);
        });
    };

    const handleCancelDelete = () => {
      setReclamationToDelete(null);
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
       headerAlign: "center",
      headerName: <strong>Client</strong>,
      width: 160,
    },
    {
      field: "titre",
       headerAlign: "center",
      headerName: <strong>Titre</strong>,
      width: 210,
    },
    { field: "reference",
     headerAlign: 'center',
    headerName: <strong>Réference</strong>, width: 180 },
   /* {
      field: "description",
      headerName: "Description",
      width: 240,
    },*/
     {
          field: " Statu",
          headerName: <strong>Traiter demande</strong>,
           headerAlign: 'center',
          width: 200,
          renderCell: (params) => {
            return (
              <>
                <Link to={"/demande/" + params.row.id}>
                  <Edit className="ListreclaEdit"/>
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
      headerName: <strong>Status</strong>,
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
   /* {
      field: "nom",
      headerName: "Nom",
      width: 180,
    },*/
      {
        field: "titre",
           headerAlign: 'center',
        headerName: <strong>Titre</strong>,
        width: 270,
      },
      { field: "reference",  headerAlign: 'center',headerName: <strong>Réference</strong>, width: 250 },
      {
        field: "description",
         headerAlign: 'center',
        headerName: <strong>Description</strong>,
        width: 330,
      },
       {
              field: "Commentaire",
               headerAlign: 'center',
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
      {
        field: "status",
         headerAlign: 'center',
        headerName: <strong>Status</strong>,
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

     /* {
        field: (
          <Link to="/demandeClient">
            <button className="ClientAddButton">Créer Demande</button>
          </Link>
        ),
        width: 210,
      },*/
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
          onRowClick={(params) => handleToggleComments(params.row.id)}
       /* checkboxSelection*/
      />
          {showDeleteConfirmation && (
       <DeleteDemande
         showDeleteConfirmation={showDeleteConfirmation}
         confirmDelete={confirmDelete}
         handleCancelDelete={handleCancelDelete}
         reclamationToDeleteData={data.find(user => user.id === reclamationToDelete)} // Assuming each user has an 'id' field
       />
     )}
       {showCommentsPopup && (
               <CommentsPopup
                 open={showCommentsPopup}
                 onClose={() => setShowCommentsPopup(false)}
                 id={commentsPopupData ? commentsPopupData.id : null}
                 type={"Demande"}
                 onCancel={() => {
                   setCommentsPopupData(null);
                   setShowCommentsPopup(false); // Close the popup and clear the data
                 }}
               />
             )}
    </div>
  );
}
