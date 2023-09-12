import React, {useEffect, useState} from "react";
import axios from "axios"
import "./comment.css"
import { DeleteOutline } from "@material-ui/icons";

const Comment = ({ comment, onRate, nom, image, onDelete,id }) => {
  const [rating, setRating] = useState(comment.rating);
  const [userRating, setUserRating] = useState(0);
  const[imageUrl, setImageUrl] = useState('')
  const token = localStorage.getItem('token');
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);

  console.log("Comment id",id)

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
       // Handle error as needed
     }
   };


  const handleRate = (star) => {
    setUserRating(star);
    onRate(comment.id, star);
    setRating(star);
  };

  return (
    <div className="comment"
        onMouseEnter={() => setShowDeleteIcon(true)} // Show delete icon on hover
        onMouseLeave={() => setShowDeleteIcon(false)} // Hide delete icon on mouse leave
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
          {[1, 2, 3, 4, 5].map((star) => (
            <span className="stars"
              key={star}
              onMouseEnter={() => setUserRating(star)}
              onMouseLeave={() => setUserRating(0)}
              onClick={() => handleRate(star)}
              style={{
                cursor: 'pointer',
                color: star <= (userRating || rating) ? '#ffc107' : 'gray',
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
