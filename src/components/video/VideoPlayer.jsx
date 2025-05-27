import React from "react";

const VideoPlayer = ({ video }) => {
  if (video.type === "short") {
    return (
      <video src={`https://boom-task-backend-2.onrender.com/api/${video.fileUrl}`} allowFullScreen controls autoPlay muted loop className="w-full max-h-96 my-4" />
    );
  }
  return (
    <iframe
      src={video.fileUrl}
      title="Video Player"
      allowFullScreen
      className="w-full h-96 my-4"
    ></iframe>
  );
};

export default VideoPlayer;
