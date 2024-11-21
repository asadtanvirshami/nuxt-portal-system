import axios from "axios";

const projectApi = {
  get: () => {
    return axios.get(
      (import.meta.env.VITE_PUBLIC_API_URL as string) + "project/get"
    );
  },
  getOne: (id: string) => {
    return axios.get(
      (import.meta.env.VITE_PUBLIC_API_URL as string) +
        `project/get-one?id=${id}`
    );
  },
};

export { projectApi };
