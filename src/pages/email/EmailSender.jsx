import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Card, CardContent } from '@material-ui/core';
import { Send as SendIcon } from '@material-ui/icons';
import axios from 'axios';
import './EmailSender.css';
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import WidgetSm from "../../components/EmailFeautures/widgetSm/WidgetSm";
import WidgetLg from "../../components/EmailFeautures/widgetLg/WidgetLg";
import {EmailProvider} from "../../context/EmailContext";

const EmailSender = () => {
    const [emailContent, setEmailContent] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState('');

    const handleSendEmail = () => {
        // Code to send the email using Axios or any other library
        console.log('Sending email...');
    };

    const handleUserSelection = (event) => {
        setSelectedUsers(event.target.value);
    };

    const handleTemplateSelection = (event) => {
        setSelectedTemplate(event.target.value);
    };

    return (
        <div className="home">
            <div className="homeWidgets">
                <EmailProvider>
                    <WidgetSm/>
                    <WidgetLg/>
                </EmailProvider>
            </div>
        </div>
    );
};

export default EmailSender;
