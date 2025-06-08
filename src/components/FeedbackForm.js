import React, { useState } from "react";

function FeedbackForm({ setFeedbacks }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: 0,
  });
  const [success, setSuccess] = useState(false);

  // Star component
  const Star = ({ starId, marked, onClick }) => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        onClick(starId);
      }
    };

    return (
      <span
        style={{
          cursor: "pointer",
          color: marked ? "gold" : "lightgray",
          fontSize: "1.5rem",
          marginRight: "6px",
        }}
        onClick={() => onClick(starId)}
        role="button"
        aria-label={`${starId} Star`}
        tabIndex={0}
        onKeyPress={handleKeyPress}
      >
        ★
      </span>
    );
  };

  const handleStarClick = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("❌ Please enter a valid email address.");
      return;
    }

    if (formData.rating === 0) {
      alert("❌ Please select a rating.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const newFeedback = await res.json();
        setFeedbacks((prev) => [newFeedback, ...prev]);
        setFormData({ name: "", email: "", message: "", rating: 0 });
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      } else {
        alert("❌ Failed to submit feedback.");
      }
    } catch (error) {
      alert("❌ Error submitting feedback: " + error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-5 p-4 bg-white rounded shadow-sm"
    >
      {success && (
        <div className="alert alert-success text-center">
          ✅ Feedback submitted successfully!
        </div>
      )}

      <div className="mb-3">
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Name"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <textarea
          required
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          placeholder="Your Feedback"
          className="form-control"
          rows={4}
        ></textarea>
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Rate the Application:</label>
        <div>
          {[1, 2, 3, 4, 5].map((starId) => (
            <Star
              key={starId}
              starId={starId}
              marked={starId <= formData.rating}
              onClick={handleStarClick}
            />
          ))}
        </div>
      </div>

      <button type="submit" className="btn btn-primary w-100 fw-bold">
        Submit Feedback
      </button>
    </form>
  );
}

export default FeedbackForm;
