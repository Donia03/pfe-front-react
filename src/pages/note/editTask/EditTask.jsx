import React, { useState, useEffect} from 'react';
import axios from 'axios';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './EditTask.css';


 const EditTask = ({modal, toggle,updateTask, taskObj}) => {
 const [titre, setTitre] = useState(taskObj.titre);
 const [description, setDescription] = useState(taskObj.description);

const handleTitreChange = ( e) => {
    setTitre(e.target.value)
}

const handleDescriptionChange = ( e) => {
    setDescription(e.target.value)
}

const handleUpdate = async () => {
  try {
    const updatedTaskObj = {
      titre: titre,
      description: description,
    };

    // Send a PUT request to update the task
    const response = await axios.put(`http://localhost:8082/api/note/${taskObj.id}`, updatedTaskObj); // Replace with your API endpoint and task ID

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

 <Modal isOpen={modal} toggle={toggle} >
         <ModalHeader toggle={toggle}>update Task</ModalHeader>
         <ModalBody>
           <form>
           <div className ="form">
           <label>Name :</label>
            <input type="text" className="custom-input" placeholder="Champ de texte" value={titre} onChange = {handleTitreChange} name= "taskName"/>
            
           </div>

           <div className ="form">
           <label>Description :</label>
           <textarea rows="4" className="custom-textarea" placeholder="Zone de texte" value={description} onChange = {handleDescriptionChange} name="description"/>
           </div>
           </form>
         </ModalBody>
         <ModalFooter>
           <Button color="primary" onClick={handleUpdate}>
             Update
           </Button>{' '}
           <Button color="secondary" onClick={toggle}>
             Cancel
           </Button>
         </ModalFooter>
       </Modal>

 );
 };
    export default EditTask;