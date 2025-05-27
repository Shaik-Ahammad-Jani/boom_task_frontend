import API from "./api";

export const buyVideo = (videoId) => API.post(`/purchase/${videoId}`);