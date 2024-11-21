import axios from "axios";

const authApi = {
  login: (email: string, password: string) => {
    return axios.post(
      (import.meta.env.VITE_PUBLIC_API_URL as string) + "auth/login",
      {
        email,
        password,
      }
    );
  },
};

export { authApi };