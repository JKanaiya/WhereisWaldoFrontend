import axios from "axios";

const ApiCall = (function() {
  const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
      "Content-Type": "application/json", // Common content type
    },
  });

  // Add an interceptor to include the token with every request
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token"); // Or sessionStorage
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  const editPost = async function({ name }: { name: string }) {
    const initName = localStorage.getItem("initName");
    return await api.patch("name", {
      name, initName
    });
  };

  const makeGuess = async ({ x, y, name, pictureId }: {
    name: string,
    x: number,
    y: number,
    pictureId: number
  }) => {
    const dimension = localStorage.getItem("dimension");
    const initName = localStorage.getItem("initName");
    return await api.post("guess", {
      name,
      dimension,
      x,
      y,
      pictureId,
      user: initName
    })
  };

  return {
    makeGuess, editPost
  };
})();

export default ApiCall;
