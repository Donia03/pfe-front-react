import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Task.css';

const Task = ({ modal, toggle, updateTaskList }) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('id');

  const handleNameChange = (e) => {
      setTaskName(e.target.value);
    }
    const handleDescriptionChange = (e) => {
          setDescription(e.target.value);
        }
    const handleStartDateChange = (e) => {
              setStartDate(e.target.value);
            }
    const handleEndDateChange = (e) => {
                  setEndDate(e.target.value);
                }


  const handleSave = async () => {
    try {
      const taskObj = {
        titre: taskName,
        description: description,
        start: startDate,
        end: endDate,
      };

      // Send a POST request to your API to save the note
      const response = await axios.post(`http://localhost:8082/api/note/${userId}`, taskObj); // Replace with your API endpoint

      // Check if the save was successful (you may need to adjust this based on your API response)
      if (response.status === 200) {
        // Clear the form (reset all states)
        setTaskName('');
        setDescription('');
        setStartDate(null);
        setEndDate(null);
        toggle(); // Close the modal or perform any other desired action
        // Call the updateTaskList callback to notify the parent component
                if (typeof updateTaskList === 'function') {
                  updateTaskList();
                }
      }
    } catch (error) {
      // Handle errors here (e.g., display an error message)
      console.error('Error saving note:', error);
    }
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}><strong>Tâche</strong></ModalHeader>
      <ModalBody>
        <form>
          <div className="form">
            <label><strong>Titre de la tâche  :</strong></label>
            <input
              type="text"
              className="custom-input"
              placeholder="Enter le titre ... "
              value={taskName}
              onChange={handleNameChange}
              name="taskName"
            />
          </div>

          <div className="form">
            <label><strong>Description  :</strong></label>
            <textarea
              rows="4"
              className="custom-textarea"
              placeholder="Ecrire une description ..."
              value={description}
              onChange={handleDescriptionChange}
              name="description"
            />
          </div>

          <div className="form">
            <label><strong>Date initiale :</strong></label>
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
        <Button color="primary" onClick={handleSave}>
          Enregistrer
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          Annuler
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Task;
