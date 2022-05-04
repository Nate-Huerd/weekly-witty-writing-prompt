import React from "react";

const CommentList = ({ comments }) => {
  return (
    <div className="card mb-3">
      <div className="card-header">
        <span className="text-light">Comments</span>
      </div>
      <div className="card-body">
        {comments &&
          comments.map((comment) => (
            <p className="pill mb-3" key={comment._id}>
              {comment.commentText} {"// "}
                {comment.author.username} on {comment.createdAt}
            </p>
          ))}
      </div>
    </div>
  );
};

export default CommentList;
