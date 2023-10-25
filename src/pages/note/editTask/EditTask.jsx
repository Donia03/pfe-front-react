import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './EditTask.css';

const EditTask = ({ modal, toggle, updateTask, taskObj }) => {
  const [titre, setTitre] = useState(taskObj.titre);
  const [description, setDescription] = useState(taskObj.description);
  const [startDate, setStartDate] = useState(taskObj.start);
  const [endDate, setEndDate] = useState(taskObj.end);

  const handleTitreChange = (e) => {
    setTitre(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleUpdate = async () => {
    try {
      const updatedTaskObj = {
        titre: titre,
        description: description,
        start: startDate,
        end: endDate,
      };

      // Send a PUT request to update the task
      const response = await axios.put(
        `http://localhost:8082/api/note/${taskObj.id}`,
        updatedTaskObj
      ); // Replace with your API endpoint and task ID

      // Check if the update was successful (you may need to adjust this based on your API response)
      if (response.status === 200) {
        // Call the updateTask function to update the task in the parent component
        if (typeof updateTask === 'function') {
          updateTask(updatedTaskObj);
        }

        toggle(); // Close the modal or perform any other desired action
      }
    } catch (error) {
      // Handle errors here (e.g., display an error message)
      console.error('Error updating task:', error);
    }
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}><strong>Modifier tâche</strong></ModalHeader>
      <ModalBody>
        <form>
          <div className="form">
            <label><strong>Titre de la tâche  :</strong></label>
            <input
              type="text"
              className="custom-input"
              placeholder="Task Name"
              value={titre}
              onChange={handleTitreChange}
              name="taskName"
            />
          </div>

          <div className="form">
            <label><strong>Description :</strong></label>
            <textarea
              rows="4"
              className="custom-textarea"
              placeholder="Task Description"
              value={description}
              onChange={handleDescriptionChange}
              name="description"
            />
          </div>

          <div className="form">
            <label><strong>Date initiale  :</strong></label>
            <input
              type="datetime-local"
              className="custom-input"
              value={startDate}
              onChange={handleStartDateChange}
              name="startDate"
            />
          </div>

          <div className="form">
            <label><strong>Date finale :</strong></label>
            <input
              type="datetime-local"
              className="custom-input"
              value={endDate}
              onChange={handleEndDateChange}
              name="endDate"
            />
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleUpdate}>
          Enregistrer
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          Annuler
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditTask;
