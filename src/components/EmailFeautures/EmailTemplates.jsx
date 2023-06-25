import React, { useContext, useState } from 'react';
import './EmailTemplates.css';
import UserList from './UserList';
import SelectedUserList from './SelectedUserList';
import SearchUser from './SearchUser';
import { EmailContext } from '../../context/EmailContext';

const EmailTemplates = () => {
    const { setLabel, setBody } = useContext(EmailContext);

    const sendEmail = (label, body) => {
        setLabel(label);
        setBody(body);
    };

    const [selectedUsers, setSelectedUsers] = useState([]);

    const emailStyles = [
        { id: 1, label: 'Happy Birthday', body: 'Happy Birthday [user]' },
        { id: 2, label: 'Welcome', body: 'Welcome to our platform [user]' },
        { id: 3, label: 'Product Advertisement', body: 'Check out our latest products' },
    ];

    return (
        <div>
            <UserList />
            <SearchUser />
            <div className="widgetSmList">
                {emailStyles.map((emailStyle) => (
                    <button
                        className="buttonStyle"
                        key={emailStyle.id}
                        onClick={() => sendEmail(emailStyle.label, emailStyle.body)}
                    >
                        {emailStyle.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default EmailTemplates;
