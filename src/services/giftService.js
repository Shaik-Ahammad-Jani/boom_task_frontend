import API from "./api";

export const giftCreator = (videoId, amount) =>
  API.post(`/gifts/${videoId}`, { amount });
