import React, { useContext, useState } from 'react';
import axios from 'axios';
import './diffusionListModal.css';
import { SelectedDiffusionListContext } from '../../context/SelectedDiffusionListContext';

const DiffusionListModal = ({ user, diffusionLists, onClose }) => {
  const [selectedList, setSelectedList] = useState(null);
  const { selectedDiffusionList, setSelectedDiffusionList } = useContext(SelectedDiffusionListContext);/*context tasna3 state globale ay component yekhu menha*/

  const handleListSelection = async (list) => {
    const objectToSave = {
      user: user,
      list: list,
    };

    try {
      const response = await axios.post('http://localhost:8082/api/diffusionList/saveUser', objectToSave);/*besh nabaathu l'objet ll back*/

      // Assuming the response indicates success
      if (response.status === 200) {
        // Update the selectedDiffusionList state using context
        setSelectedDiffusionList([...selectedDiffusionList, user]);
        onClose();
      }
    } catch (error) {
      console.error('Error updating diffusion list:', error);
    }
  };
/*besh yaaml boucle aal deffusionlist */
  return (
    <div className="modalDiffusionList">
      <h2>Sélectionnez une liste de diffusion</h2>
      <ul>
        {diffusionLists.map((list) => (
          <li key={list.id}>
            {list.nom}{' '}
            <button className="save5" onClick={() => handleListSelection(list)}>Select</button>
          </li>
        ))}
      </ul>
      <button className="save5" onClick={onClose}>Annuler</button>
    </div>
  );
};

export default DiffusionListModal;
