import API from "./api";

export const addComment = (videoId, text) =>
  API.post(`/comments/${videoId}`, { text });

export const getComments = (videoId) => API.get(`/comments/${videoId}`);
