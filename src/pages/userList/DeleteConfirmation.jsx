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
          Are you sure you want to delete the user{" "}
          <span className="userToDelete">
            {userToDeleteData ? `${userToDeleteData.prenom} ${userToDeleteData.nom}` : ""}
          </span>
          ?
        </p>
        <div className="deleteConfirmationButtons">
          <button className="deleteConfirmationConfirmButton" onClick={confirmDelete}>
            Confirm
          </button>
          <button className="deleteConfirmationCancelButton" onClick={handleCancelDelete}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
