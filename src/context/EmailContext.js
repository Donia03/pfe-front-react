// EmailContext.js
import React, { createContext, useState } from 'react';

// Create the context
export const EmailContext = createContext();

// Create a provider component
export const EmailProvider = ({ children }) => {
    const [label, setLabel] = useState('');
    const [body, setBody] = useState('');

    return (
        <EmailContext.Provider value={{ label, setLabel, body, setBody }}>
            {children}
        </EmailContext.Provider>
    );
};
