import React, { useState, useEffect } from "react";
import axios from "axios";
import { Close } from "@material-ui/icons";
import "./commentsPopup.css"; // Add CSS for styling
import Comment from './Comment'; // Import the Comment component

const CommentsPopup = ({ open, onClose,id, onCancel }) => {
  const [comments, setComments] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('id');
  const image = localStorage.getItem('image');
  const nom = localStorage.getItem('nom');



  useEffect(() => {
    // Fetch comments from the API when the component mounts
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/comments/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        setComments(response.data);
        console.log("comments api response",comments)
      } catch (error) {
        console.error('Error fetching comments:', error);
        // Handle error as needed
      }
    };
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
        reclamationId: id,
        rating: 0,
        image: image,
        nom:nom
      };

      try {
        const response = await axios.post('http://localhost:8082/api/comment', newComment, {
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

  const generateUniqueId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  if (!open) return null; // Don't render if the popup is closed

  return (
    <div className="comments-popup">
      <div className="comments-popup-header">
        <h2>Comments</h2>
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
          />
        ))}
      </div>
      <div>
        <input
          type="text"
          placeholder="Write a comment..."
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
        />
        <button onClick={handleAddComment}>Add</button>
      </div>
    </div>
  );
};

export default CommentsPopup;