import React, { useEffect, useState } from "react";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}`)
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
