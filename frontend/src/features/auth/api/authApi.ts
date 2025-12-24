import { baseApi } from "@/shared/api/baseApi";
import { AuthResponce, LoginRequest, Registration } from "../model/types";
import { User } from "@/entities/session/model/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthResponce, LoginRequest>({
      query: (credential) => ({
        url: "/auth/login",
        method: "POST",
        body: credential,
      }),
    }),

    register: build.mutation<void, Registration>({
      query: (credential) => ({
        url: "/auth/register",
        method: "POST",
        body: credential,
      }),
    }),

    getMe: build.query<User, void>({
      query: () => "/auth/me",
      providesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetMeQuery } = authApi;
