import { api } from "../api";

export type Token = { token: string };
export type Telegram = { initData: string };
export type PWA = {
  email: string;
  password: string;
};

export const loginApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<Token, PWA>({
      query: (data: PWA) => {
        const { email, password } = data;
        return {
          url: "/auth/login",
          method: "POST",
          body: {
            email: email,
            password: password,
          },
        };
      },
    }),
    registration: build.mutation<void, PWA>({
      query: (data: PWA) => {
        return {
          url: "/auth/create",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useLoginMutation, useRegistrationMutation } = loginApi;
