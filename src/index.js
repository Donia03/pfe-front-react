import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {AuthProvider} from "./context/AuthContext";
import { SelectedDiffusionListProvider } from './context/SelectedDiffusionListContext'; // Import the context
import './global.css';

ReactDOM.render(
  <React.StrictMode>
  <AuthProvider>
  <SelectedDiffusionListProvider>
    <App />
  </SelectedDiffusionListProvider>
  </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
