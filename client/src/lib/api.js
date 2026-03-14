import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err.response?.data || err)
);

export const projectsAPI = {
  getAll: () => api.get("/projects"),
  create: (data) => api.post("/projects", data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
};

export const contactAPI = {
  send: (data) => api.post("/contact", data),
  getMessages: () => api.get("/contact/messages"),
  markRead: (id) => api.patch(`/contact/messages/${id}/read`),
  delete: (id) => api.delete(`/contact/messages/${id}`),
};

export const authAPI = {
  login: (data) => api.post("/auth/login", data),
};

export default api;
