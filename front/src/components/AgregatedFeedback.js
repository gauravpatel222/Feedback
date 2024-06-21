// src/components/AggregatedFeedback.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AggregatedFeedback = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    axios.get('/api/feedback')
      .then(response => {
        setFeedbackData(response.data);
      })
      .catch(error => {
        console.error('Error retrieving feedback data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Aggregated Feedback</h2>
      {feedbackData.map(item => (
        <div key={item._id}>
          <h3>{item._id}</h3>
          <p>Average Rating: {item.avgRating}</p>
          <p>Comments: {item.comments.join(', ')}</p>
        </div>
      ))}
    </div>
  );
};

export default AggregatedFeedback;
