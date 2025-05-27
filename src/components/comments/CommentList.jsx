// import React, { useEffect, useState } from "react";
// import { getComments } from "../../services/commentService";

// const CommentList = ({ videoId }) => {
//   const [comments, setComments] = useState([]);

//   useEffect(() => {
//     const fetchComments = async () => {
//       const res = await getComments(videoId);
//       setComments(res.data);
//     };
//     fetchComments();
//   }, [videoId]);

//   return (
//     <div className="mt-4">
//       <h3 className="font-bold">Comments</h3>
//       {comments.map((c) => (
//         <div key={c._id} className="border-t py-2">
//           <p className="text-sm text-gray-600">{c.user.username}</p>
//           <p>{c.text}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CommentList;
import React, { useEffect, useState } from "react";
import { getComments } from "../../services/commentService";

const CommentList = ({ videoId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await getComments(videoId);
      setComments(res.data);
    };
    fetchComments();
  }, [videoId]);

  return (
    <div className="mt-5">
      {/* Header Section */}
      <div className="d-flex align-items-center mb-4">
        <div className="bg-primary rounded-circle p-2 me-3">
          <i className="bi bi-chat-dots text-white fs-5"></i>
        </div>
        <h3 className="fw-bold mb-0 text-dark">
          Comments 
          <span className="badge bg-primary ms-2">{comments.length}</span>
        </h3>
      </div>

      {/* Comments Container */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          {comments.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-chat-square-dots text-muted" style={{fontSize: '3rem'}}></i>
              <p className="text-muted mt-3 mb-0">No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            comments.map((c, index) => (
              <div 
                key={c._id} 
                className={`p-4 border-bottom position-relative ${index % 2 === 0 ? 'bg-light' : 'bg-white'}`}
                style={{
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8f9fa';
                  e.currentTarget.style.transform = 'translateX(5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#f8f9fa' : '#ffffff';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                {/* User Avatar and Info */}
                <div className="d-flex align-items-start">
                  <div className="bg-gradient bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" 
                       style={{width: '40px', height: '40px', minWidth: '40px'}}>
                    <span className="text-white fw-bold">
                      {c.user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex-grow-1">
                    {/* Username and timestamp */}
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <h6 className="fw-semibold text-primary mb-0">
                        @{c.user.username}
                      </h6>
                      <small className="text-muted">
                        <i className="bi bi-clock me-1"></i>
                        {new Date().toLocaleDateString()}
                      </small>
                    </div>
                    
                    {/* Comment text */}
                    <p className="mb-2 text-dark lh-base" style={{fontSize: '0.95rem'}}>
                      {c.text}
                    </p>
                    
                    {/* Action buttons */}
                    <div className="d-flex align-items-center">
                      <button className="btn btn-sm btn-outline-primary me-2 border-0">
                        <i className="bi bi-heart me-1"></i>
                        Like
                      </button>
                      <button className="btn btn-sm btn-outline-secondary border-0">
                        <i className="bi bi-reply me-1"></i>
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Decorative line */}
                <div className="position-absolute top-0 start-0 bg-primary" 
                     style={{width: '3px', height: '100%', opacity: '0.3'}}></div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentList;