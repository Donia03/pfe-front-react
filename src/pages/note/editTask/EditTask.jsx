import React, { useState, useEffect} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './EditTask.css';


 const EditTask = ({modal, toggle,updateTask, taskObj}) => {
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

useEffect(() => {
setTaskName(taskObj.Name)
setDescription(taskObj.Description)

}, [] )

const handleUpdate = (e) =>{
   e.preventDefault();
   let tempObj ={}
   tempObj['Name'] = taskName 
   tempObj['Description'] = description 
   updateTask(tempObj)
}





 return (

 <Modal isOpen={modal} toggle={toggle} >
         <ModalHeader toggle={toggle}>update Task</ModalHeader>
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