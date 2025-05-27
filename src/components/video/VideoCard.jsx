import React from "react";
import { useNavigate } from "react-router-dom";

const VideoCard = ({ video }) => {
  const navigate = useNavigate();
  const isShort = video.type === "short";

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body">
        <h5 className="card-title font-weight-bold">{video.title}</h5>
        <p className="card-text text-muted">By {video.creator.username}</p>
        {isShort ? (
          <video
            src={`http://localhost:5000/${video.fileUrl}`}
            controls
            className="my-2 w-100"
            style={{ maxHeight: "240px" }} // Adjust max height for video
          ></video>
        ) : (
          <img
            src="https://via.placeholder.com/300x180"
            alt="Thumbnail"
            className="my-2 w-100"
            style={{ maxHeight: "240px", objectFit: "cover" }} // Adjust max height for image
          />
        )}
        <button
          className="btn btn-primary mt-2"
          onClick={() => navigate(`/video/${video._id}`)}
        >
          {isShort ? "Watch" : video.price > 0 ? `Buy for ₹${video.price}` : "Watch"}
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
