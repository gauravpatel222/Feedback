// src/components/FeedbackForm.js
import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/feedback', {
      category,
      rating,
      comments,
    })
      .then(response => {
        // Handle successful feedback submission
        console.log('Feedback submitted:', response.data);
      })
      .catch(error => {
        // Handle feedback submission error
        console.error('Error submitting feedback:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Product Features">Product Features</option>
          <option value="Product Pricing">Product Pricing</option>
          <option value="Product Usability">Product Usability</option>
        </select>
      </div>
      <div>
        <label>Rating</label>
        <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
      </div>
      <div>
        <label>Comments</label>
        <textarea value={comments} onChange={(e) => setComments(e.target.value)}></textarea>
      </div>
      <button type="submit">Submit Feedback</button>
    </form>
  );
};

export default FeedbackForm;
