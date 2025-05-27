import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import UploadForm from "../components/video/UploadForm";

const UploadPage = () => {
  return (
    <div className="container py-5" style={{ maxWidth: "540px" }}>
      <h2 className="text-center mb-4 fw-bold">Upload Video</h2>
      <UploadForm />
    </div>
  );
};

export default UploadPage;
