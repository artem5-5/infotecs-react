import { useMutation } from "@tanstack/react-query";
import { LoginRequest } from "../api/login";

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => LoginRequest(username, password),
  });
};
