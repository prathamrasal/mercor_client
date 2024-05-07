import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://ec2-13-201-51-186.ap-south-1.compute.amazonaws.com/v1/api",
});

export const loginUser = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return axiosInstance
    .post("/auth/login", {
      username: email,
      password,
    })
    .then((res) => res.data);
};

export const registerUser = ({
  email,
  password,
  confirmPassword,
}: {
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  return axiosInstance
    .post("/auth/register", {
      username: email,
      password,
      confirm_password: confirmPassword,
    })
    .then((res) => res.data);
};
