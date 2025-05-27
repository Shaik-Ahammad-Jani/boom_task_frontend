import React, { useState, useRef, useEffect } from "react";
import { addComment } from "../../services/commentService";

const CommentForm = ({ videoId }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const textareaRef = useRef(null);
  
  const maxChars = 500;

  useEffect(() => {
    setCharCount(text.length);
  }, [text]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || loading) return;
    
    try {
      setLoading(true);
      await addComment(videoId, text);
      setText("");
      setCharCount(0);
      
      // Success feedback
      const submitBtn = e.target.querySelector('button[type="submit"]');
      submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Posted!';
      submitBtn.classList.remove('btn-primary');
      submitBtn.classList.add('btn-success');
      
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Post Comment';
        submitBtn.classList.remove('btn-success');
        submitBtn.classList.add('btn-primary');
      }, 2000);
      
    } catch (err) {
      alert("❌ Failed to post comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    if (newText.length <= maxChars) {
      setText(newText);
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [text]);

  const isNearLimit = charCount > maxChars * 0.8;
  const isAtLimit = charCount >= maxChars;

  return (
    <div className="comment-form-container">
      <form onSubmit={handleSubmit} className="my-4">
        {/* Form Header */}
        <div className="d-flex align-items-center mb-3">
          <div className="bg-gradient rounded-circle d-flex align-items-center justify-content-center me-3"
               style={{
                 width: '40px',
                 height: '40px',
                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
               }}>
            <i className="fas fa-user text-white"></i>
          </div>
          <div>
            <h6 className="mb-0 text-white">Share your thoughts</h6>
            <small className="text-muted">Join the conversation</small>
          </div>
        </div>

        {/* Textarea Container */}
        <div className={`position-relative transition-all ${focused ? 'focused-container' : ''}`}>
          <div className={`form-floating ${focused || text ? 'has-content' : ''}`}>
            <textarea
              ref={textareaRef}
              value={text}
              onChange={handleTextChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onInput={adjustTextareaHeight}
              placeholder="What are your thoughts on this video?"
              className={`form-control bg-dark text-white border-2 ${
                focused ? 'border-primary shadow-lg' : 'border-secondary'
              }`}
              style={{
                minHeight: '60px',
                maxHeight: '150px',
                resize: 'none',
                borderRadius: '15px',
                transition: 'all 0.3s ease',
                fontSize: '1rem',
                lineHeight: '1.5'
              }}
              disabled={loading}
            />
            <label className="text-muted">
              <i className="fas fa-comment-dots me-2"></i>
              Add a comment...
            </label>
          </div>

          {/* Character Counter */}
          <div className="position-absolute bottom-0 end-0 me-3 mb-2">
            <small className={`badge ${
              isAtLimit ? 'bg-danger' : 
              isNearLimit ? 'bg-warning text-dark' : 
              'bg-secondary'
            }`}>
              {charCount}/{maxChars}
            </small>
          </div>
        </div>

        {/* Action Bar */}
        <div className={`d-flex justify-content-between align-items-center mt-3 transition-all ${
          focused || text ? 'opacity-100' : 'opacity-50'
        }`}>
          {/* Left side - Formatting options */}
          <div className="d-flex gap-2">
            <button 
              type="button" 
              className="btn btn-outline-secondary btn-sm rounded-pill"
              title="Add emoji"
              disabled={loading}
            >
              <i className="fas fa-smile"></i>
            </button>
            <button 
              type="button" 
              className="btn btn-outline-secondary btn-sm rounded-pill"
              title="Mention someone"
              disabled={loading}
            >
              <i className="fas fa-at"></i>
            </button>
            <button 
              type="button" 
              className="btn btn-outline-secondary btn-sm rounded-pill"
              title="Add GIF"
              disabled={loading}
            >
              <i className="fas fa-images"></i>
            </button>
          </div>

          {/* Right side - Submit actions */}
          <div className="d-flex gap-2 align-items-center">
            {text.trim() && (
              <button 
                type="button" 
                className="btn btn-outline-secondary btn-sm rounded-pill"
                onClick={() => {
                  setText("");
                  setCharCount(0);
                  textareaRef.current?.focus();
                }}
                disabled={loading}
              >
                <i className="fas fa-times me-1"></i>
                Clear
              </button>
            )}
            
            <button 
              type="submit" 
              className={`btn btn-primary btn-lg rounded-pill px-4 ${
                !text.trim() || loading || isAtLimit ? 'disabled' : ''
              }`}
              style={{
                background: text.trim() && !loading && !isAtLimit 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                  : '',
                border: 'none',
                minWidth: '140px'
              }}
              disabled={!text.trim() || loading || isAtLimit}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Posting...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane me-2"></i>
                  Post Comment
                </>
              )}
            </button>
          </div>
        </div>

        {/* Guidelines */}
        {focused && (
          <div className="mt-3 p-3 bg-dark rounded-3 border border-secondary">
            <small className="text-muted">
              <i className="fas fa-info-circle me-2 text-primary"></i>
              <strong>Community Guidelines:</strong> Be respectful, constructive, and follow our community standards. 
              Your comment will be visible to everyone.
            </small>
          </div>
        )}
      </form>

      <style jsx>{`
        .comment-form-container .transition-all {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .focused-container {
          transform: translateY(-2px);
        }
        
        .form-floating.has-content label {
          transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
          color: var(--bs-primary);
        }
        
        .form-control:focus {
          box-shadow: 0 0 0 0.25rem rgba(102, 126, 234, 0.25);
        }
        
        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .opacity-100 {
          opacity: 1;
        }
        
        .opacity-50 {
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
};

export default CommentForm;