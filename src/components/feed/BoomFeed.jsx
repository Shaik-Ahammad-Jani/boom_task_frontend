import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { getFeed } from "../../services/videoService";
import VideoCard from "../video/VideoCard";
import { Navigate, useNavigate } from "react-router-dom";

const BoomFeed = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setLoading(true);
        const res = await getFeed();
        setVideos(res.data);
        setError(null);
      } catch (err) {
        setError("Failed to load videos. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center" role="alert">
          <i className="fas fa-exclamation-triangle fa-2x mb-3"></i>
          <h4>Oops! Something went wrong</h4>
          <p>{error}</p>
          <button className="btn btn-outline-danger" onClick={() => window.location.reload()}>
            <i className="fas fa-redo me-2"></i>Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative'
    }}>
      {/* Animated Background Elements */}
      <div className="position-absolute w-100 h-100 overflow-hidden">
        <div className="position-absolute rounded-circle bg-white opacity-10" 
             style={{width: '300px', height: '300px', top: '10%', left: '80%', animation: 'float 6s ease-in-out infinite'}}></div>
        <div className="position-absolute rounded-circle bg-white opacity-5"
             style={{width: '200px', height: '200px', top: '60%', left: '10%', animation: 'float 8s ease-in-out infinite reverse'}}></div>
      </div>

      <div className="container py-5 position-relative">
        {/* Hero Header */}
        <div className="text-center mb-5">
          <div className="d-inline-block p-3 rounded-circle bg-white shadow-lg mb-4">
            <i className="fas fa-fire text-danger fa-3x"></i>
          </div>
          <h1 className="display-4 fw-bold text-white mb-3">
            <span className="text-warning">Boom</span> Feed
          </h1>
          <p className="lead text-white-50 mb-4">
            Discover trending videos and amazing content
          </p>
          <div className="d-flex justify-content-center align-items-center gap-3 mb-4">
            <span className="badge bg-warning text-dark px-3 py-2 rounded-pill">
              <i className="fas fa-video me-2"></i>
              {videos.length} Videos
            </span>
            <span className="badge bg-success px-3 py-2 rounded-pill">
              <i className="fas fa-clock me-2"></i>
              Updated Now
            </span>
          </div>
        </div>

        {/* Videos Grid */}
        <div className="row g-4">
          {videos.map((video, index) => (
            <div className="col-xl-4 col-lg-6 col-md-6" key={video._id}>
              <div 
                className="card h-100 border-0 shadow-lg bg-white"
                style={{
                  borderRadius: '20px',
                  transform: 'translateY(0)',
                  transition: 'all 0.3s ease',
                  animation: `fadeInUp 0.6s ease ${index * 0.1}s both`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                {/* Video Card Container */}
                <div className="position-relative overflow-hidden" style={{borderRadius: '20px 20px 0 0'}}>
                  <VideoCard video={video} />
                  
                  {/* Video Type Badge */}
                  <div className="position-absolute top-0 start-0 m-3">
                    <span className={`badge ${video.type === 'short' ? 'bg-danger' : 'bg-primary'} px-3 py-2 rounded-pill`}>
                      <i className={`fas ${video.type === 'short' ? 'fa-play-circle' : 'fa-film'} me-2`}></i>
                      {video.type === 'short' ? 'Short' : 'Long-Form'}
                    </span>
                  </div>

                  {/* Premium Badge */}
                  {video.price > 0 && (
                    <div className="position-absolute top-0 end-0 m-3">
                      <span className="badge bg-warning text-dark px-3 py-2 rounded-pill">
                        <i className="fas fa-crown me-2"></i>
                        Premium
                      </span>
                    </div>
                  )}
                </div>

                <div className="card-body col-lg-12 p-4">
                  <div className="d-flex align-items-start justify-content-between mb-3">
                    <h5 className="card-title fw-bold text-dark mb-0 flex-grow-1" 
                        style={{lineHeight: '1.3', fontSize: '1.1rem'}}>
                      {video.title}
                    </h5>
                    {video.price > 0 && (
                      <span className="badge bg-success ms-2 px-2 py-1">
                        ₹{video.price}
                      </span>
                    )}
                  </div>
                  
                  <p className="card-text text-muted mb-3" 
                     style={{fontSize: '0.9rem', lineHeight: '1.5'}}>
                    {video.description?.length > 100 
                      ? `${video.description.substring(0, 100)}...` 
                      : video.description}
                  </p>

                  {/* Stats Row */}
                  <div className="d-flex align-items-center justify-content-between mb-3 text-muted">
                    <div className="d-flex align-items-center gap-3">
                      <small className="d-flex align-items-center">
                        <i className="fas fa-eye me-1"></i>
                        {video.views || '0'} views
                      </small>
                      <small className="d-flex align-items-center">
                        <i className="fas fa-heart me-1"></i>
                        {video.likes || '0'}
                      </small>
                    </div>
                    <small className="text-muted">
                      <i className="fas fa-calendar-alt me-1"></i>
                      {formatDate(video.uploadedAt)}
                    </small>
                  </div>

                  {/* Action Buttons */}
                  <div className="d-flex gap-2">
                    <button 
                      className="btn flex-grow-1 text-white fw-semibold"
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        borderRadius: '10px'
                      }}
                     
                    >
                      <i className="fas fa-play me-2"></i>
                      Watch Now
                    </button>
                    <button className="btn btn-outline-secondary" 
                            style={{borderRadius: '10px', aspectRatio: '1'}}>
                      <i className="fas fa-bookmark"></i>
                    </button>
                    <button className="btn btn-outline-secondary"
                            style={{borderRadius: '10px', aspectRatio: '1'}}>
                      <i className="fas fa-share-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {videos.length === 0 && (
          <div className="text-center py-5">
            <div className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                 style={{width: '100px', height: '100px'}}>
              <i className="fas fa-video fa-3x text-muted"></i>
            </div>
            <h3 className="text-white mb-3">No Videos Yet</h3>
            <p className="text-white-50 mb-4">Be the first to share something amazing!</p>
            <button className="btn btn-warning btn-lg rounded-pill px-4">
              <i className="fas fa-plus me-2"></i>
              Upload Video
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default BoomFeed;