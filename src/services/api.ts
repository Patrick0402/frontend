// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://super-space-chainsaw-v7p5pjgrgr6hwv49-3001.app.github.dev",
});

export default api;
