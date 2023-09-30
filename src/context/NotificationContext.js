import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [notifChange, setNotifChange] = useState(false);

  const addNotification = (notification) => {
    setNotifications((prevNotifications) => [...prevNotifications, notification]);
  };

  const removeNotification = (notificationId) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== notificationId)
    );
  };

  return (
    <NotificationContext.Provider value={{ notifications,setNotifications,notifChange,setNotifChange, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
