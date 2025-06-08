function FeedbackList({ feedbacks = [] }) {
  return (
    <div className="mt-4">
      <h2 className="mb-4 border-bottom pb-2 fs-4 text-primary">
        Submitted Feedback
      </h2>
      {feedbacks.map((fb) => {
        const rating = Math.min(Math.max(fb.rating || 0, 1), 5);

        return (
          <div key={fb._id} className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-1 text-primary">
                {fb.name}{" "}
                <small className="text-muted fs-6">({fb.email})</small>
              </h5>
              <p className="card-text mb-2">{fb.message}</p>

              <div className="mb-2">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`bi ${i < rating ? "bi-star-fill text-warning" : "bi-star text-secondary"}`}
                    style={{ fontSize: "1.3rem", marginRight: "4px" }}
                  ></i>
                ))}
              </div>

              <p className="text-muted small mb-0">
                <i className="bi bi-clock me-1"></i>
                {new Date(fb.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FeedbackList;
