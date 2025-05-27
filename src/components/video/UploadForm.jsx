import React, { useState } from "react";
import { uploadVideo } from "../../services/videoService";

const UploadForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "short",
    url: "",
    price: 0,
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      if (file) data.append("file", file);

      await uploadVideo(data);
      alert("Video uploaded successfully");
    } catch (err) {
      alert("Upload failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-12 col-lg-12">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-gradient text-white text-center py-4" 
                 style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
              <h3 className="mb-0">
                <i className="fas fa-video me-2"></i>
                Upload Video
              </h3>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="form-label fw-semibold">
                    <i className="fas fa-heading me-2 text-primary"></i>
                    Video Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter video title"
                    value={formData.title}
                    onChange={handleChange}
                    className="form-control form-control-lg"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="description" className="form-label fw-semibold">
                    <i className="fas fa-align-left me-2 text-primary"></i>
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Enter video description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-control"
                    rows="4"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="type" className="form-label fw-semibold">
                    <i className="fas fa-list me-2 text-primary"></i>
                    Video Type
                  </label>
                  <select 
                    id="type"
                    name="type" 
                    value={formData.type} 
                    onChange={handleChange} 
                    className="form-select form-select-lg"
                  >
                    <option value="short">
                      <i className="fas fa-play-circle"></i> Short-Form Video
                    </option>
                    <option value="long">
                      <i className="fas fa-film"></i> Long-Form Video
                    </option>
                  </select>
                </div>

                {formData.type === "short" ? (
                  <div className="mb-4">
                    <label htmlFor="file" className="form-label fw-semibold">
                      <i className="fas fa-upload me-2 text-primary"></i>
                      Upload Video File
                    </label>
                    <input
                      type="file"
                      id="file"
                      accept=".mp4"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="form-control form-control-lg"
                    />
                    <div className="form-text">
                      <i className="fas fa-info-circle me-1"></i>
                      Only MP4 files are supported
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <div className="col-md-8 mb-3">
                      <label htmlFor="url" className="form-label fw-semibold">
                        <i className="fas fa-link me-2 text-primary"></i>
                        Video URL
                      </label>
                      <input
                        type="url"
                        id="url"
                        name="url"
                        placeholder="https://example.com/video"
                        value={formData.url}
                        onChange={handleChange}
                        className="form-control form-control-lg"
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="price" className="form-label fw-semibold">
                        <i className="fas fa-rupee-sign me-2 text-success"></i>
                        Price
                      </label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text">₹</span>
                        <input
                          type="number"
                          id="price"
                          name="price"
                          placeholder="0"
                          value={formData.price}
                          onChange={handleChange}
                          className="form-control"
                          min="0"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="d-grid gap-2 mt-4">
                  <button 
                    type="submit" 
                    className="btn btn-lg text-white fw-semibold py-3"
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      borderRadius: '10px'
                    }}
                  >
                    <i className="fas fa-cloud-upload-alt me-2"></i>
                    Upload Video
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;