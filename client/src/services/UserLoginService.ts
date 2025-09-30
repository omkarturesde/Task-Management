import axios from "axios";
const BASE_URL = "http://localhost:3000/api";

export const loginUser = async (data: any) => {
  const response = await axios.post(`${BASE_URL}/user/login`, data);
  return response;
};

export const signupUser = async (data: any) => {
  const response = await axios.post(`${BASE_URL}/user/register`, data);
  return response;
};
