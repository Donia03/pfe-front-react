import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {AuthProvider} from "./context/AuthContext";
import { SelectedDiffusionListProvider } from './context/SelectedDiffusionListContext'; // Import the context
import { DiffusionsProvider } from './context/DiffusionsContext'; // Import the context
import { UserProvider } from './context/UserContext'; // Import the context
import { NotificationProvider } from './context/NotificationContext';
import './global.css';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <SelectedDiffusionListProvider>
        <DiffusionsProvider>
          <UserProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
          </UserProvider>
        </DiffusionsProvider>
      </SelectedDiffusionListProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);