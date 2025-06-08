import React, { useEffect, useState } from "react";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetch("https://feedback-backend-rezm.onrender.com/api/feedback") // Update this with your backend URL
      .then((res) => res.json())
      .then((data) => setFeedbacks(data));
  }, []);

  return (
    <div className="container">
      <h1>Feedback Application</h1>
      <FeedbackForm setFeedbacks={setFeedbacks} />
      <FeedbackList feedbacks={feedbacks} />
    </div>
  );
}

export default App;
