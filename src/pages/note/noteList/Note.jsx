import React, { useState } from 'react';
import './Note.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Task from '../taskNote/Task';
import { useEffect } from 'react';

import Card from '../card/Card';
const Note = () => {

  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([])
 
useEffect(() => {
 /* fonction hedh jbednahom ml localstorge o hata ki nefrishiw page tokaaed les donnees*/
let arr = localStorage.getItem("taskList")
if (arr){
  let obj = JSON.parse(arr)
  setTaskList(obj)
}

}, [])


  const toggle = () =>  {
    setModal(!modal);
  }

  const saveTask = (taskObj) => {
    let tempList = taskList 
    tempList.push(taskObj)
    localStorage.setItem("taskList", JSON.stringify(tempList)) /*houni sagelneha fl local storge*/
    setModal(false)
    setTaskList(taskList)
  }

  const deleteTask = (index) => {
     let templist = taskList 
     templist.splice(index, 1)
     localStorage.setItem("taskList", JSON.stringify(templist))
     setTaskList(templist)
     window.location.reload() /*refreche ll page baaed local storge */

  }
  const updateListArray = ( obj, index) => {
    let templist= taskList 
    templist[index] = obj 
    localStorage.setItem("taskList", JSON.stringify(templist))
    setTaskList(templist)
    window.location.reload()
  }
    return (
    
        <div className="home ">
    <div className = "header text-center">
                <h1 className= "titree">Mes Activites</h1>
               <button className= "btncenter" onClick = {() => setModal(true)} >Ajouter Activiter </button>
          
               </div>     
               <div className="task-container ">
          {taskList.map((obj, index) => <Card taskObj={obj} index={index} deleteTask={deleteTask} updateListArray={updateListArray}/>)}
       
    
        </div>
        <Task toggle = {toggle} modal = {modal} save = {saveTask}/>
    </div>
    );
    };
    export default Note;
