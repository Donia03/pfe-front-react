import React, {useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Delete as DeleteIcon } from '@material-ui/icons';
import './UserList.css';
import { DiffusionsContext } from '../../context/DiffusionsContext';
import { useDiffusionLists } from '../hooks/useDiffusionLists';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [saveListVisible, setSaveListVisible] = useState(false);
    const [listName, setListName] = useState('');
    const { diffusionLists, setDiffusionLists } = useDiffusionLists();


    useEffect(() => {
        // Fetch the list of users from the API
        axios
            .get('http://localhost:8082/api/users')
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    }, []);

    useEffect(() => {
        // Load the selected users from localStorage
        const savedUsers = localStorage.getItem('selectedUsers');
        if (savedUsers) {
            setSelectedUsers(JSON.parse(savedUsers));
        }
    }, []);

    useEffect(() => {
        // Save the selected users to localStorage whenever it changes
        localStorage.setItem('selectedUsers', JSON.stringify(selectedUsers));
    }, [selectedUsers]);

    const handleUserSelect = (event) => {
        const selectedOptions = Array.from(
            event.target.selectedOptions,
            (option) => users.find((user) => user.id === parseInt(option.value))
        );
        setSelectedUsers(selectedOptions);
    };

    const handleTagDelete = (user) => {
        const updatedUsers = selectedUsers.filter(
            (selectedUser) => selectedUser.id !== user.id
        );
        setSelectedUsers(updatedUsers);
    };

    const handleSaveList = () => {
        setSaveListVisible(true);
    };

    const handleListNameChange = (event) => {
        setListName(event.target.value);
    };

    const saveDiffusionList = () => {
        // Execute the saveSelectedUser function with the selectedUsers and listName
        console.log('Saving selected users:', selectedUsers);
        console.log('List name:', listName);

        const difusionList = {
            nom: listName,
            users : selectedUsers
        }

         axios
           .post('http://localhost:8082/api/diffusionList',difusionList)
           .then((response) => {
             console.log(response.data);
             if (response.status === 200) {
                                 // Update the diffusions state using context
                                 setDiffusionLists([...diffusionLists, difusionList]);
                             }

                 })
           .catch((error) => {
              console.error('Error fetching users:', error);
           });

        // Clear the input field and hide the save list elements
        setListName('');
        setSaveListVisible(false);
        setSelectedUsers([]);
    };

    return (
        <div>
            <h3><strong>Sélectionner une nouvelle liste de diffusion:</strong></h3>
            <select
                className="userSelect"
                multiple
                value={selectedUsers.map((user) => user.id)}
                onChange={handleUserSelect}
            >
                <option value="">Sélectionner :</option>
                {users.map((user) => (
                    <option
                        key={user.id}
                        value={user.id}
                    >
                        {user.prenom + ' ' + user.nom}
                    </option>
                ))}
            </select>
            {selectedUsers.length > 0 && (
                <div>

                    <div className="tagList">
                        {selectedUsers.map((user, index) => (
                            <div className="tag1" key={index}>
                                {user.prenom} {user.nom}
                                <DeleteIcon
                                    className="deleteIcon"
                                    onClick={() => handleTagDelete(user)}
                                />
                            </div>
                        ))}
                    </div>
                    {!saveListVisible && (
                        <button className="save1" onClick={handleSaveList}>
                            Enregistrer
                        </button>
                    )}
                    {saveListVisible && (
                        <div>
                            <label> <strong>Nommez cette liste:  </strong></label>
                            <input
                                type="text"
                                value={listName}
                                onChange={handleListNameChange}
                            />
                            <br/> <br/>
                            <button className="save1" onClick={saveDiffusionList}>
                                Enregister
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserList;
