import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./topbar.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios"
import { NotificationsNone, Language, Settings } from "@material-ui/icons";

export default function Topbar() {
const[image, setImage] = useState('')
    const[imageUrl, setImageUrl] = useState('')
const token = localStorage.getItem('token');
const userId = localStorage.getItem('id');
const history = useHistory();
const { authenticated, setAuthenticated } = useContext(AuthContext);
useEffect(() => {
    getUserById()
  },[]);
  useEffect(() => {
          if (image) {
            getUserImage();
          }
        }, [image]);

        const getUserById = async () => {
            const result = await axios.get("http://localhost:8082/api/user/"+userId,
            {
                  headers: {
                   "Authorization": `Bearer ${token}`,
                  }
            });
            const data = result.data
            setImage(data.imagePath)
          }

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

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">CRM</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer" onClick={handleSettingsClick}>
            <Settings />
          </div>
          <img src={imageUrl} alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
