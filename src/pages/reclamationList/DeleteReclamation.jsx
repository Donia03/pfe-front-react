import React from "react";

const DeleteConfirmation = ({
  showDeleteConfirmation,
  confirmDelete,
  handleCancelDelete,
  userToDeleteData,
}) => {
  if (!showDeleteConfirmation) {
    return null; // Don't render anything if confirmation popup is not visible
  }

  return (
    <div className="deleteConfirmationPopup">
      <div className="deleteConfirmationPopupContent">
        <p className="deleteConfirmationSentence">
        Êtes-vous sûr de vouloir supprimer cette reclamation de :
          <span className="userToDelete">
            {userToDeleteData ? ` ${userToDeleteData.nom}` : ""}
          </span>
          ?
        </p>
        <div className="deleteConfirmationButtons">
          <button className="btn btn-primary" onClick={confirmDelete}>
            Supprimer
          </button>
          <button className="btn btn-secondary" onClick={handleCancelDelete}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
