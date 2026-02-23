import axios from "axios";

export const LoginRequest = async (
  username: string,
  password: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "admin" && password === "admin") {
        resolve("fake-jwt-token");
      } else {
        reject(new Error("Invalid username or password"));
      }
    }, 2000);
  });
};
