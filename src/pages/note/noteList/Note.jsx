import React, { useState } from 'react';
import axios from 'axios';
import './Note.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Task from '../taskNote/Task';
import { useEffect } from 'react';

import Card from '../card/Card';
const Note = () => {

  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([])
  const userId = localStorage.getItem('id');

  useEffect(() => {
      // Fetch data from the API and set the taskList
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:8082/api/notes/${userId}`, {
            // Add any necessary headers here, such as authentication headers
          });

          if (response.status === 200) {
            setTaskList(response.data); // Set the taskList with the API response
          } else {
            console.error('Failed to fetch data from the API');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData(); // Call the fetchData function when the component mounts
    }, []);


// Define a function to refetch data
  const updateTaskList = async () => {
    try {
      const response = await axios.get(`http://localhost:8082/api/notes/${userId}`, {
        // Add any necessary headers here, such as authentication headers
      });

      if (response.status === 200) {
        setTaskList(response.data); // Set the taskList with the updated data
      } else {
        console.error('Failed to fetch data from the API');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const toggle = () =>  {
    setModal(!modal);
  }



  const deleteTask = async (taskId, index) => {
    try {
      // Make an API request to delete the task
      const response = await axios.delete(`http://localhost:8082/api/note/${taskId}`, {
        // Add any necessary headers here, such as authentication headers
      });

      if (response.status === 200) {
        // Delete the task from the local state (taskList)
        let updatedTaskList = [...taskList];
        updatedTaskList.splice(index, 1);
        setTaskList(updatedTaskList);
      } else {
        console.error('Failed to delete task from the API');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

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
          {taskList.map((obj, index) => (
                    <Card taskObj={obj} index={obj.id} deleteTask={deleteTask} updateListArray={updateListArray} />
                  ))}


        </div>
        <Task toggle = {toggle} modal = {modal} updateTaskList={updateTaskList}/>
    </div>
    );
    };
    export default Note;
