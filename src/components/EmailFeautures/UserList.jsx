import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Delete as DeleteIcon } from '@material-ui/icons';
import './UserList.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [saveListVisible, setSaveListVisible] = useState(false);
    const [listName, setListName] = useState('');

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
            (option) => option.value
        );
        setSelectedUsers(selectedOptions);
    };

    const handleTagDelete = (user) => {
        const updatedUsers = selectedUsers.filter(
            (selectedUser) => selectedUser !== user
        );
        setSelectedUsers(updatedUsers);
    };

    const handleSaveList = () => {
        setSaveListVisible(true);
    };

    const handleListNameChange = (event) => {
        setListName(event.target.value);
    };

    const saveSelectedUser = () => {
        // Execute the saveSelectedUser function with the selectedUsers and listName
        console.log('Saving selected users:', selectedUsers);
        console.log('List name:', listName);

        // Clear the input field and hide the save list elements
        setListName('');
        setSaveListVisible(false);
        setSelectedUsers([]);
    };

    return (
        <div>
            <h2>User Select</h2>
            <select
                className="userSelect"
                multiple
                value={selectedUsers}
                onChange={handleUserSelect}
            >
                <option value="">Select users</option>
                {users.map((user) => (
                    <option
                        key={user.id}
                        value={user.prenom + ' ' + user.nom}
                    >
                        {user.prenom + ' ' + user.nom}
                    </option>
                ))}
            </select>
            {selectedUsers.length > 0 && (
                <div>
                    <p>Selected users:</p>
                    <div className="tagList">
                        {selectedUsers.map((user, index) => (
                            <div className="tag" key={index}>
                                {user}
                                <DeleteIcon
                                    className="deleteIcon"
                                    onClick={() => handleTagDelete(user)}
                                />
                            </div>
                        ))}
                    </div>
                    {!saveListVisible && (
                        <button className="saveButton" onClick={handleSaveList}>
                            Save this list
                        </button>
                    )}
                    {saveListVisible && (
                        <div>
                            <label>Choose a name for your list:</label>
                            <input
                                type="text"
                                value={listName}
                                onChange={handleListNameChange}
                            />
                            <button className="save" onClick={saveSelectedUser}>
                                Save
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserList;
