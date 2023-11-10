import React, { useState, useEffect } from "react";
import axios from "axios";
import { Close } from "@material-ui/icons";
import "./commentsPopup.css"; // Add CSS for styling
import Comment from './Comment'; // Import the Comment component
import { Edit } from "@material-ui/icons";
const CommentsPopup = ({ open, onClose,id,type, onCancel }) => {
  const [comments, setComments] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('id');
  const image = localStorage.getItem('image');
  const nom = localStorage.getItem('nom');



  const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/comments/${id}/{type}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        setComments(response.data);
        console.log("comments api response", comments);
      } catch (error) {
        console.error('Error fetching comments:', error);
        // Handle error as needed
      }
    };

    useEffect(() => {
      // Fetch comments from the API when the component mounts
      fetchComments();
    }, [id, token]);

  const handleRateComment = (commentId, userRating) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return { ...comment, rating: userRating };
      }
      return comment;
    });

    setComments(updatedComments);
  };



  const handleAddComment = async () => {
    if (newCommentText.trim() !== '') {
      const newComment = {
        comment: newCommentText,
        userId: userId, // Get the user's ID from localStorage
        typeId: id,
        rating: 0,
        image: image,
        nom:nom,
        type:type
      };

      try {
        const response = await axios.post(`http://localhost:8082/api/comment/${userId}`, newComment, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        // Assuming your API returns the created comment object, you can update the comments state
        const createdComment = response.data;
        setComments([...comments, createdComment]); // Update the comments list with the new comment
        setNewCommentText('');
      } catch (error) {
        console.error('Error creating comment:', error);
        // Handle error as needed
      }
    }
  };
  const handleDeleteComment = async (commentId) => {

        // Remove the deleted comment from the comments list
        const updatedComments = comments.filter(
          (comment) => comment.id !== commentId
        );
        setComments(updatedComments);

    };

  const generateUniqueId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  if (!open) return null; // Don't render if the popup is closed

  return (
    <div className="comments-popup">
      <div className="comments-popup-header">
        <h2>Commentaires</h2>
        <Close className="close-icon" onClick={onCancel} />
      </div>
      <div>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment.comment}
            onRate={handleRateComment}
            nom={comment.nom} // Pass the user's name to the Comment component
            image={comment.image} // Pass the user's image URL to the Comment component
            onDelete={handleDeleteComment}
            id={comment.id}
            userIdComment={comment.userId}
            rating={comment.rating}
          />
        ))}
      </div>
      <div>
        <input className="custominput "
          type="text"
          placeholder="Ecrire un commentaire..."
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
        />
<button className="btn btn-primary" onClick={handleAddComment}>Commenter</button>
      </div>
    </div>
  );
};

export default CommentsPopup;
