import React, { useEffect, useState } from "react";
import axios from "axios";
import "./comment.css";
import { DeleteOutline } from "@material-ui/icons";

const Comment = ({
  comment,
  onRate,
  nom,
  image,
  onDelete,
  id,
  userIdComment,
  rating,
}) => {
  const [userRating, setUserRating] = useState(rating);
  const [imageUrl, setImageUrl] = useState("");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
  const role = localStorage.getItem("role");
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);

  console.log("Comment id", id);

  useEffect(() => {
    if (image) {
      getUserImage();
    }
  }, [image]);

  const getUserImage = async () => {
    const result = await axios.get("http://localhost:8082/api/images/" + image, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    });

    const blob = result.data;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result;
      setImageUrl(base64data);
    };
    reader.readAsDataURL(blob);
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`http://localhost:8082/api/comment/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onDelete(id); // Pass the correct commentId to onDelete
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleRate = async (star) => {
    const starValue = parseInt(star, 10); // Parse the star value as an integer
    setUserRating(starValue);

    try {
      const response = await axios.put(
        `http://localhost:8082/api/comment/${id}`,
        { rating: starValue }, // Send the star value as JSON data
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // Set the content type to JSON
          },
        }
      );

      if (response.status === 200) {
        onRate(id, starValue)
      } else {
        console.error("Failed to update rating.");
      }
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };



  console.log("userIdComment:", userIdComment);
  console.log("userId:", userId);
  console.log("role:", role);
  console.log("showDeleteIcon:", showDeleteIcon);

  // Add a log to check if the condition is met
  console.log("Condition for delete icon:", userId === userIdComment && role === "Client");

  return (
    <div
      className="comment"
      onMouseEnter={() => setShowDeleteIcon(true)}
      onMouseLeave={() => setShowDeleteIcon(false)}
    >
      {showDeleteIcon && (
        <DeleteOutline
          className="delete-icon"
          onClick={handleDeleteClick}
        />
      )}
      <div className="userShowTop">
        <img
          src={imageUrl}
          alt=""
          className="userShowImg"
        />
        <div className="userShowTopTitle">
          <span className="userShowUsername">{nom}</span>
        </div>
      </div>
      <p className="comment-text">{comment}</p>
      <div>
        <div className="starsBlock">
          {Array.from({ length: 5 }).map((_, index) => (
            <span
              className="stars"
              key={index}
              onMouseEnter={() => setUserRating(index + 1)}
              onMouseLeave={() => setUserRating(rating)}
              onClick={() => handleRate(index + 1)}
              style={{
                cursor: "pointer",
                color:
                  index < userRating ? "#ffc107" : index < comment.rating ? "gray" : "white",
              }}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comment;
