import axios from "axios";

export const instance = axios.create({
  baseURL: "http://www.omdbapi.com",
  params: {
    apikey: process.env.NEXT_PUBLIC_API_KEY,
  },
});