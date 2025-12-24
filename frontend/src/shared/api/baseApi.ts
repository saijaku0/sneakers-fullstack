import { RootState } from "@/app/providers/store/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

process.env.NEXT_PUBLIC_API_URL;

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState }) => {
      let token = (getState() as RootState).session.token;

      if (!token && typeof window !== "undefined")
        token = localStorage.getItem("token");

      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Products", "Cart", "User", "Sneakers", "Order"],
  endpoints: () => ({}),
});
