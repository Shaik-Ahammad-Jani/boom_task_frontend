import API from "./api";

export const uploadVideo = (formData) =>
  API.post("/videos/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getFeed = () => API.get("/videos/feed");