import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Task.css';


 const Task = ({modal, toggle, save}) => {
 const [taskName, setTaskName] = useState('');
 const [description, setDescription] = useState('');


const handleChange = (e) => {
  const {name, value} =e.target
  if (name === "taskName") {
    setTaskName(value)
  }else { 
    setDescription(value)
  }
 
}

const handleSave = () => {
   let taskObj = {}
   taskObj["Name"] = taskName
   taskObj["Description"] = description
   save(taskObj)
}


 return (

 <Modal isOpen={modal} toggle={toggle} >
         <ModalHeader toggle={toggle}>Task</ModalHeader>
         <ModalBody>
           <form>
           <div className ="form">
           <label>Name :</label>
            <input type="text" className="custom-input" placeholder="Champ de texte" value={taskName} onChange = {handleChange} name= "taskName"/>
            
           </div>

           <div className ="form">
           <label>Description :</label>
           <textarea rows="4" className="custom-textarea" placeholder="Zone de texte" value={description} onChange = {handleChange} name="description"/>
           </div> 
           </form>
         </ModalBody>
         <ModalFooter>
           <Button color="primary" onClick={handleSave}>
             Creat
           </Button>{' '}
           <Button color="secondary" onClick={toggle}>
             Cancel
           </Button>
         </ModalFooter>
       </Modal>

 );
 };
    export default Task;