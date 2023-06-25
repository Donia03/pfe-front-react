import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './SelectedUserList.css';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { EmailContext } from '../../context/EmailContext';


const SelectedUserList = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedDiffusionList, setSelectedDiffusionList] = useState([]);
    const { label, body, setLabel, setBody } = useContext(EmailContext);

    useEffect(() => {
        // Fetch the list of users from the API
        axios
            .get('http://localhost:8082/api/diffusionList')
            .then((response) => {
                setUsers(response.data);
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
            // Fetch data from the second API with selectedUser as a parameter
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
    }, [selectedUser]);

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
        updatedList.splice(index, 1);
        setSelectedDiffusionList(updatedList);
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
            })
            .catch((error) => {
                // Handle error response
                console.error('Error sending email:', error);
            });
    };

    return (
        <div>
            <h2>Selected Users</h2>
            <ul className="radioList">
                {users.map((user) => (
                    <li key={user.id}>
                        <label>
                            <input
                                type="radio"
                                value={user.nom}
                                checked={selectedUser === user.nom}
                                onChange={handleUserSelect}
                            />
                            {user.nom}
                        </label>
                    </li>
                ))}
            </ul>
            {selectedUser && (
                <div className="emailDetails">
                    <h3>Email Details</h3>
                    <label htmlFor="labelInput">Label:</label>
                    <input
                        type="text"
                        id="labelInput"
                        className="emailInput"
                        value={label}
                        onChange={handleLabelChange}
                    />
                    <br />
                    <label htmlFor="bodyTextarea">Body:</label>
                    <textarea
                        id="bodyTextarea"
                        className="emailTextarea"
                        value={body}
                        onChange={handleBodyChange}
                    />
                </div>
            )}
            {selectedUser && <p>Selected list diffusion: {selectedUser}</p>}
            {selectedDiffusionList && (
                <div className="tagList">
                    {selectedDiffusionList.map((user, index) => (
                        <div className="tag" key={index}>
                            {user.prenom + ' ' + user.nom}
                            <DeleteIcon
                                className="deleteIcon"
                                onClick={() => handleDelete(index)}
                            />
                        </div>
                    ))}
                </div>
            )}
            <button className="sendButton" onClick={handleSendEmail}>
                Send Mail
            </button>
        </div>
    );
};

export default SelectedUserList;
