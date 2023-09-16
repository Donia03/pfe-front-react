import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './SelectedUserList.css';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { EmailContext } from '../../context/EmailContext';
import { SelectedDiffusionListContext } from '../../context/SelectedDiffusionListContext'; // Import the context


const SelectedUserList = () => {
    const [diffusionLists, setDiffusionLists] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const { label, body, setLabel, setBody } = useContext(EmailContext);
    const { selectedDiffusionList, setSelectedDiffusionList } = useContext(SelectedDiffusionListContext); // Get selectedDiffusionList from context

    useEffect(() => {
        // Fetch the list of users from the API
        axios
            .get('http://localhost:8082/api/diffusionList')
            .then((response) => {
                setDiffusionLists(response.data);
                // Check if there is a previously selected user in local storage
                const storedUser = localStorage.getItem('selectedUser');
                if (storedUser) {
                    setSelectedUser(storedUser);
                } else {
                    // Select the first user by default
                    setSelectedUser(response.data[0]?.nom);
                }
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    }, []);

    useEffect(() => {
        if (selectedUser) {
          axios
            .get(`http://localhost:8082/api/diffusionList/${selectedUser}`)
            .then((response) => {
              setSelectedDiffusionList(
                response.data.users.map((user) => ({
                  id: user.id,
                  nom: user.nom,
                  prenom: user.prenom,
                  email: user.email,
                }))
              );
            })
            .catch((error) => {
              console.error('Error fetching data from second API:', error);
            });
        }
      }, [selectedUser, setSelectedDiffusionList]);

    const handleUserSelect = (event) => {
        const selectedValue = event.target.value;
        setSelectedUser(selectedValue);
        // Save the selected user to local storage
        localStorage.setItem('selectedUser', selectedValue);
    };

    const handleLabelChange = (event) => {
        setLabel(event.target.value);
    };

    const handleBodyChange = (event) => {
        setBody(event.target.value);
    };

    const handleDelete = (index) => {
        const updatedList = [...selectedDiffusionList];
        const deletedUser = updatedList.splice(index, 1)[0];
        setSelectedDiffusionList(updatedList);

        // If selectedDiffusionList is empty, send a DELETE request to delete the entire diffusion list
        if (selectedDiffusionList.length === 0) {
            axios
                .delete(`http://localhost:8082/api/diffusionList/${selectedUser}`)
                .then((response) => {
                    console.log('Deleted entire diffusion list');
                    setSelectedUser(''); // Clear selectedUser since the list is deleted
                    setSelectedDiffusionList([]); // Clear the selected diffusion list
                })
                .catch((error) => {
                    console.error('Error deleting diffusion list:', error);
                });
        } else {
            // Send a DELETE request to delete the user from the diffusion list
            axios
                .delete(`http://localhost:8082/api/diffusionList/user/${selectedUser}/${deletedUser.id}`)
                .then((response) => {
                    console.log('Deleted user from diffusion list:', deletedUser.id);
                })
                .catch((error) => {
                    console.error('Error deleting user from diffusion list:', error);
                });
        }
    };


    const handleSendEmail = () => {
        const emailData = {
            label: label,
            body: body,
            to: selectedDiffusionList,
        };

        // Send the email data to the API
        axios
            .post('http://localhost:8082/api/sendEmail', emailData)
            .then((response) => {
                // Handle success response
                console.log('Email sent successfully!');
                setLabel('')
                 setBody('')
            })
            .catch((error) => {
                // Handle error response
                console.error('Error sending email:', error);
            });
    };
    const handleDeleteIconClick = (userId) => {
        axios
          .delete(`http://localhost:8082/api/diffusionList/user/${userId}`)
          .then((response) => {
            console.log('Deleted diffusion list for user with ID:', userId);
            // Refresh the list of users after successful deletion
            axios
              .get('http://localhost:8082/api/diffusionList')
              .then((response) => {
                setDiffusionLists(response.data);
                setSelectedDiffusionList([]); // Clear the selected diffusion list
              })
              .catch((error) => {
                console.error('Error refreshing users:', error);
              });
          })
          .catch((error) => {
            console.error('Error deleting diffusion list:', error);
          });
      };


    return (
        <div>
            <h2>Liste diffusion</h2>
            <ul className="radioList">
              {diffusionLists.map((user) => (
                <li key={user.id} className="userItem">
                  <div className="userLabel">
                    <input
                      type="radio"
                      value={user.nom}
                      checked={selectedUser === user.nom}
                      onChange={handleUserSelect}
                    />
                    {user.nom}
                  </div>
                  {selectedDiffusionList && (
                    <DeleteIcon
                      className="deleteIcon"
                      onClick={() => handleDeleteIconClick(user.id)}
                    />
                  )}
                </li>
              ))}
            </ul>
            {selectedUser && (
                <div className="emailDetails">
                    <h3>Email detailles :</h3>
                    <label htmlFor="labelInput">Sujet:</label>
                    <input
                        type="text"
                        id="labelInput"
                        className="emailInput"
                        value={label}
                        onChange={handleLabelChange}
                    />
                    <br />
                    <label htmlFor="bodyTextarea">Objet:</label>
                    <textarea
                        id="bodyTextarea"
                        className="emailTextarea"
                        value={body}
                        onChange={handleBodyChange}
                    />
                </div>
            )}
            {selectedUser && <p> liste Selectionnée : {selectedUser}</p>}
            {selectedDiffusionList && (
                <div className="tagList">
                    {selectedDiffusionList.map((user, index) => (
                        <div className="tag" key={index}>
                            {diffusionLists.prenom + ' ' + user.nom}
                            <DeleteIcon
                                className="deleteIcon"
                                onClick={() => handleDelete(index)}
                            />
                        </div>
                    ))}
                </div>
            )}
            <button className="sendButton" onClick={handleSendEmail}>
                envoye  Email
            </button>
        </div>
    );
};

export default SelectedUserList;
