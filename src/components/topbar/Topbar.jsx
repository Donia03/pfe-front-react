import React, { useEffect, useState,useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./topbar.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios"
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { useNotification } from '../../context/NotificationContext';

export default function Topbar() {
const[image, setImage] = useState('')
    const[imageUrl, setImageUrl] = useState('')
const token = localStorage.getItem('token');
const userId = localStorage.getItem('id');
const history = useHistory();
const { authenticated, setAuthenticated } = useContext(AuthContext);
const [showNotifications, setShowNotifications] = useState(false);
const notificationsRef = useRef(null);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const eventSource = new EventSource(`http://localhost:8082/api/notifications/${userId}`);

        eventSource.addEventListener("notification", (event) => {
            // Handle incoming messages here
            const newNotifications = JSON.parse(event.data);
            setNotifications(newNotifications);
        });

        return () => {
            eventSource.close(); // Close the SSE connection when the component unmounts
        };
    }, []);
useEffect(() => {
    const eventSource = new EventSource(`http://localhost:8082/api/userRealTimeChange/${userId}`);

    eventSource.addEventListener("user", (event) => {
        // Handle incoming messages here
        const userData = JSON.parse(event.data);
        setImage(userData.imagePath);
    });

    return () => {
        eventSource.close(); // Close the SSE connection when the component unmounts
    };
  },[]);
  useEffect(() => {
          if (image) {
            getUserImage();
          }
        }, [image]);



const getUserImage = async () => {
        const result = await axios.get("http://localhost:8082/api/images/" + image, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
          responseType: "blob", // Tell Axios to handle the response as a blob (binary data)
        });

        const blob = result.data;

        // Convert the blob to a base64-encoded URL
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result;
          setImageUrl(base64data);
        };
        reader.readAsDataURL(blob);
      };
      const handleSettingsClick = () => {
          // Remove user-related data from localStorage
          localStorage.removeItem('token');
          localStorage.removeItem('id');
          localStorage.removeItem('role');

          // Set authenticated to false
              setAuthenticated(false);

          // Redirect to the login page
          history.push("/login");
        };
        const toggleNotifications = () => {
            setShowNotifications(!showNotifications);
          };

          const closeNotifications = (e) => {
            if (notificationsRef.current && !notificationsRef.current.contains(e.target)) {
              setShowNotifications(false);
            }
          };

          useEffect(() => {
            document.addEventListener("mousedown", closeNotifications);
            return () => {
              document.removeEventListener("mousedown", closeNotifications);
            };
          }, []);

          const handleNotificationClick = (notification) => {
              // Create a new URL using the notification.link
                const newUrl = new URL(notification.link, window.location.origin);

                // Replace the entire URL
                window.location.replace(newUrl.toString());

              // Close the notifications dropdown
              setShowNotifications(false);
              setReadNotification(notification.id);

            };
            const setReadNotification = async (id) => {
                const result = await axios.get("http://localhost:8082/api/showNotification/"+id, {
                  headers: {
                    "Authorization": `Bearer ${token}`,
                  }
                });
              }

  return authenticated ? (
      <div className="topbar">
        <div className="topbarWrapper">
          <div className="topLeft">
            <span className="logo">CRM</span>
          </div>
          <div className="topRight">
            <div className="topbarIconContainer"
                onClick={toggleNotifications}
                ref={notificationsRef}
            >
                          <NotificationsNone />
                          {notifications.length > 0 && (
                                            <span className="topIconBadge">{notifications.length}</span>
                                        )}
                                    {showNotifications && (
                                                  <div className="notificationsDropdown">
                                                    {notifications.map((notification) => (
                                                      <div key={notification.id}
                                                       className="notificationItem"
                                                       onClick={() => handleNotificationClick(notification)}
                                                       >
                                                        {notification.message}
                                                      </div>
                                                    ))}
                                                  </div>
                                                )}
                        </div>
            <div className="topbarIconContainer" onClick={handleSettingsClick}>
              <Settings />
            </div>
            <img src={imageUrl} alt="" className="topAvatar" />
          </div>
        </div>
      </div>
    ) : null;
}