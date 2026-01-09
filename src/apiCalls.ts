import axios from "axios";

const ApiCall = (function () {
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

  const makeGuess = async function ({
    x,
    y,
    name,
    pictureId,
  }: {
    x: number;
    y: number;
    name: string;
    pictureId: number;
  }) {
    console.log(x);
    console.log(y);

    const dimension = localStorage.getItem("dimension");
    const user = localStorage.getItem("initName");
    return await api.post("guess", {
      x,
      y,
      user,
      dimension,
      name,
      pictureId,
    });
  };

  const setName = async function ({ name }: { name: string }) {
    const initName = localStorage.getItem("initName");
    return await api.patch("name", {
      name,
      initName,
    });
  };

  // TODO: this could change to picture data to limit the
  const getCharData = async function ({ name }: { name: string }) {
    return await api.get(`charData?name=${name}`);
  };

  return {
    makeGuess,
    setName,
    getCharData,
  };
})();

export default ApiCall;
