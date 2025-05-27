import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import BoomFeed from "../components/feed/BoomFeed";
const FeedPage = () => {
  return (
    <div className="container py-4">
      <BoomFeed />
    </div>
  );
};
export default FeedPage;
