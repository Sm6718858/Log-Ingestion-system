import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const getLogs = (filters = {}) =>
  axios.get(`${BASE_URL}/logs`, { params: filters });

export const postLog = (logData) =>
  axios.post(`${BASE_URL}/logs`, logData);
