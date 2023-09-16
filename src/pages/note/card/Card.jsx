import React, { useState } from 'react';
import EditTask from '../editTask/EditTask';
import './Card.css';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ScheduleIcon from '@material-ui/icons/Schedule';

const Card = ({ taskObj, index, deleteTask, updateListArray }) => {
  const [modal, setModal] = useState(false);

  const colors = [
    {
      primaryColor: "#5D93E1",
      secondaryColor: "#ECF3FC"
    },
    {
      primaryColor: "#F9D288",
      secondaryColor: "#FEFAF1"
    },
    {
      primaryColor: "#5DC250",
      secondaryColor: "#F2FAF1"
    },
    {
      primaryColor: "#F48687",
      secondaryColor: "#FDF1F1"
    },
    {
      primaryColor: "#B964F7",
      secondaryColor: "#F3F0FD"
    }
  ];

  const toggle = () => {
    setModal(!modal);
  };

  const updateTask = (obj) => {
    updateListArray(obj, index);
  };

  const handleDelete = () => {
    deleteTask(index);
  };

  return (
    <div className="card-wrapper">
      <div className="card-top" style={{ backgroundColor: colors[index % 5].primaryColor }}></div>
      <div className="task-holder">
        <span className="card-header" style={{ backgroundColor: colors[index % 5].primaryColor, borderRadius: "10px" }}>{taskObj.titre}</span>
        <div className="description-wrapper">
          <p className="description">{taskObj.description}</p>
        </div>
        <div className="icons-time-container">

          <div className="time">
            <div>
              <AccessTimeIcon style={{ color: 'yellow' }} /> {taskObj.start}
            </div>
            <div>
              <ScheduleIcon style={{ color: 'red' }} /> {taskObj.end}
            </div>
          </div>
          <div className="icons">
                      <i className="far fa-edit mr-3" style={{ color: colors[index % 5].primaryColor, cursor: "pointer" }} onClick={() => setModal(true)}></i>
                      <i className="fas fa-trash-alt" style={{ color: colors[index % 5].primaryColor, cursor: "pointer" }} onClick={handleDelete}></i>
                    </div>
        </div>
      </div>
      <EditTask modal={modal} toggle={toggle} updateTask={updateListArray} taskObj={taskObj} />
      <div className="card-bottom" style={{ backgroundColor: colors[index % 5].primaryColor }}></div>
    </div>
  );
};

export default Card;
