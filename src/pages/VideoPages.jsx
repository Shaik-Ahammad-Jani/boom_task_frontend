import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFeed } from "../services/videoService";
import { buyVideo } from "../services/purchaseService";
import { useAuth } from "../context/AuthContext";
import VideoPlayer from "../components/video/VideoPlayer";
import CommentList from "../components/comments/CommentList";
import CommentForm from "../components/comments/CommentForm";
import GiftModal from "../components/gifts/GiftModal";

const VideoPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [video, setVideo] = useState(null);
  const [showGift, setShowGift] = useState(false);
  const [loading, setLoading] = useState(true);
  const [purchased, setPurchased] = useState(false);
  const [liked, setLiked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        const res = await getFeed();
        const match = res.data.find((v) => v._id === id);
        setVideo(match);
      } catch (error) {
        console.error("Error fetching video:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [id]);

  const handleBuy = async () => {
    try {
      await buyVideo(id);
      setPurchased(true);
      // Success toast would be better than alert
      alert("Video purchased successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Purchase failed");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatViews = (views) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views?.toString() || '0';
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" 
           style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
        <div className="text-center text-white">
          <div className="spinner-border mb-3" style={{width: '3rem', height: '3rem'}} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h4>Loading amazing content...</h4>
        </div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center"
           style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
        <div className="text-center text-white">
          <i className="fas fa-exclamation-triangle fa-3x mb-3"></i>
          <h4>Video not found</h4>
          <p>The video you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const isPaidLong = video.type === "long" && video.price > 0;

  return (
    <div className="min-vh-100" style={{background: 'linear-gradient(to bottom, #1a1a2e 0%, #16213e 100%)'}}>
      <div className="container-fluid px-0">
        {/* Hero Video Section */}
        <div className="row g-0">
          <div className="col-12">
            <div className="position-relative bg-black">
              {/* Video Player Container */}
              <div className="ratio ratio-16x9" style={{maxHeight: '70vh'}}>
                <VideoPlayer video={video} controls className="w-100 h-100 " />
              </div>
              
              {/* Overlay Elements */}
              <div className="position-absolute top-0 start-0 w-100 h-100">
                {/* Premium Badge */}
                {isPaidLong && (
                  <div className="position-absolute top-0 end-0 m-4">
                    <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fs-6">
                      <i className="fas fa-crown me-2"></i>
                      Premium Content
                    </span>
                  </div>
                )}
                
                {/* Video Type Badge */}
                <div className="position-absolute top-0 start-0 m-4">
                  <span className={`badge ${video.type === 'short' ? 'bg-danger' : 'bg-primary'} px-3 py-2 rounded-pill fs-6`}>
                    <i className={`fas ${video.type === 'short' ? 'fa-play-circle' : 'fa-film'} me-2`}></i>
                    {video.type === 'short' ? 'Short-Form' : 'Long-Form'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container py-4">
          <div className="row">
            {/* Main Content */}
            <div className="col-lg-8">
              {/* Video Info Card */}
              <div className="card bg-dark text-white border-0 shadow-lg mb-4" style={{borderRadius: '15px'}}>
                <div className="card-body p-4">
                  {/* Title and Stats */}
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="flex-grow-1">
                      <h1 className="h3 fw-bold mb-2 text-white">{video.title}</h1>
                      <div className="d-flex align-items-center gap-3 text-muted">
                        <span><i className="fas fa-eye me-1"></i>{formatViews(video.views)} views</span>
                        <span><i className="fas fa-calendar me-1"></i>{formatDate(video.uploadedAt)}</span>
                        <span className={`badge ${video.type === 'short' ? 'bg-danger' : 'bg-primary'}`}>
                          {video.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Creator Info and Actions */}
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center">
                      <div className="bg-gradient rounded-circle d-flex align-items-center justify-content-center me-3"
                           style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                        <i className="fas fa-user text-white fa-lg"></i>
                      </div>
                      <div>
                        <h6 className="mb-0 text-white fw-semibold">{video.creator?.username || 'Unknown Creator'}</h6>
                        <small className="text-muted">Content Creator</small>
                      </div>
                    </div>
                    
                    <button 
                      className={`btn ${subscribed ? 'btn-success' : 'btn-outline-light'} rounded-pill px-4`}
                      onClick={() => setSubscribed(!subscribed)}
                    >
                      <i className={`fas ${subscribed ? 'fa-check' : 'fa-plus'} me-2`}></i>
                      {subscribed ? 'Subscribed' : 'Subscribe'}
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="d-flex gap-2 flex-wrap">
                    <button 
                      className={`btn ${liked ? 'btn-danger' : 'btn-outline-light'} rounded-pill`}
                      onClick={() => setLiked(!liked)}
                    >
                      <i className={`fas fa-heart me-2`}></i>
                      {liked ? 'Liked' : 'Like'} ({video.likes || 0})
                    </button>
                    
                    <button className="btn btn-outline-light rounded-pill">
                      <i className="fas fa-share me-2"></i>Share
                    </button>
                    
                    <button className="btn btn-outline-light rounded-pill">
                      <i className="fas fa-download me-2"></i>Save
                    </button>
                    
                    <button 
                      onClick={() => setShowGift(true)} 
                      className="btn btn-warning rounded-pill text-dark fw-semibold"
                    >
                      <i className="fas fa-gift me-2"></i>Gift Creator
                    </button>
                  </div>
                </div>
              </div>

              {/* Description Card */}
              {video.description && (
                <div className="card bg-dark text-white border-0 shadow-lg mb-4" style={{borderRadius: '15px'}}>
                  <div className="card-body p-4">
                    <h5 className="card-title mb-3">
                      <i className="fas fa-align-left me-2 text-primary"></i>
                      Description
                    </h5>
                    <p className="card-text text-light" style={{lineHeight: '1.6'}}>
                      {video.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Comments Section */}
              <div className="card bg-dark text-white border-0 shadow-lg" style={{borderRadius: '15px'}}>
                <div className="card-header bg-transparent border-0 p-4">
                  <h5 className="mb-0">
                    <i className="fas fa-comments me-2 text-primary"></i>
                    Comments
                  </h5>
                </div>
                <div className="card-body p-4 pt-0">
                  <CommentForm videoId={id} />
                  <hr className="text-muted my-4" />
                  <CommentList videoId={id} />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              {/* Purchase Card */}
              {isPaidLong && !purchased && (
                <div className="card bg-gradient text-white border-0 shadow-lg mb-4" 
                     style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '15px'}}>
                  <div className="card-body text-center p-4">
                    <i className="fas fa-crown fa-3x mb-3"></i>
                    <h4 className="card-title">Premium Content</h4>
                    <p className="card-text mb-4">
                      Unlock this exclusive content and support the creator
                    </p>
                    <div className="d-grid">
                      <button 
                        onClick={handleBuy} 
                        className="btn btn-warning btn-lg text-dark fw-bold rounded-pill"
                      >
                        <i className="fas fa-shopping-cart me-2"></i>
                        Buy for ₹{video.price}
                      </button>
                    </div>
                    <small className="d-block mt-3 opacity-75">
                      <i className="fas fa-shield-alt me-1"></i>
                      Secure payment • Instant access
                    </small>
                  </div>
                </div>
              )}

              {/* Video Stats Card */}
              <div className="card bg-dark text-white border-0 shadow-lg mb-4" style={{borderRadius: '15px'}}>
                <div className="card-header bg-transparent border-0 p-4">
                  <h6 className="mb-0">
                    <i className="fas fa-chart-bar me-2 text-primary"></i>
                    Video Statistics
                  </h6>
                </div>
                <div className="card-body p-4 pt-0">
                  <div className="row text-center">
                    <div className="col-4">
                      <div className="border-end border-secondary">
                        <h4 className="text-primary mb-1">{formatViews(video.views)}</h4>
                        <small className="text-muted">Views</small>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="border-end border-secondary">
                        <h4 className="text-danger mb-1">{video.likes || 0}</h4>
                        <small className="text-muted">Likes</small>
                      </div>
                    </div>
                    <div className="col-4">
                      <h4 className="text-success mb-1">{video.shares || 0}</h4>
                      <small className="text-muted">Shares</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Videos Placeholder */}
              <div className="card bg-dark text-white border-0 shadow-lg" style={{borderRadius: '15px'}}>
                <div className="card-header bg-transparent border-0 p-4">
                  <h6 className="mb-0">
                    <i className="fas fa-fire me-2 text-danger"></i>
                    Related Videos
                  </h6>
                </div>
                <div className="card-body p-4 pt-0">
                  <p className="text-muted text-center py-3">
                    <i className="fas fa-video fa-2x mb-2 d-block"></i>
                    More amazing content coming soon!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gift Modal */}
      {showGift && (
        <GiftModal 
          videoId={id} 
          onClose={() => setShowGift(false)} 
        />
      )}
    </div>
  );
};

export default VideoPage;