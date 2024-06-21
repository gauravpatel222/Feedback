// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import FeedbackForm from './components/FeedbackForm';
import AggregatedFeedback from './components/AggregatedFeedback';
import axios from 'axios';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/auth/user');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, []);

  const handleLoginSuccess = (response) => {
    axios.post('/api/auth/google', { token: response.credential })
      .then(res => setUser(res.data))
      .catch(err => console.error('Login failed:', err));
  };

  const handleLogout = () => {
    axios.post('/api/auth/logout')
      .then(() => setUser(null))
      .catch(err => console.error('Logout failed:', err));
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Router>
        <div className="App">
          <h1>Customer Feedback Platform</h1>
          {user ? (
            <div>
              <p>Welcome, {user.name}</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onFailure={(error) => console.log('Login failed:', error)}
            />
          )}
          <Switch>
            <Route path="/feedback" component={FeedbackForm} />
            <Route path="/aggregated-feedback" component={AggregatedFeedback} />
          </Switch>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
