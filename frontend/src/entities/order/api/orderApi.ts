import { baseApi } from "@/shared/api/baseApi";
import { CreateOrderRequest, Order } from "../model/types";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation<Order, CreateOrderRequest>({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Order"],
    }),

    getMyOrders: build.query<Order[], void>({
      query: () => "/orders/my",
      providesTags: ["Order"],
    }),
  }),
});

export const { useCreateOrderMutation, useGetMyOrdersQuery } = orderApi;
