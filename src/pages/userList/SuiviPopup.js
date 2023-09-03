// SuiviPopup.js

import React from "react";
import "./SuiviPopup.css";

export default function SuiviPopup({ suiviText, setSuiviText, onSave, onCancel }) {
  return (
    <div className="suiviPopup">
      <div className="suiviPopupContent">
        <h2>Fiche de Suivi</h2>
        <textarea
          className="suiviTextArea"
          value={suiviText}
          onChange={(e) => setSuiviText(e.target.value)}
        />
        <div className="suiviButtons">
          <button className="suiviSaveButton" onClick={onSave}>
            Save
          </button>
          <button className="suiviCancelButton" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}  
