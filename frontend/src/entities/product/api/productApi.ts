import { baseApi } from "@/shared/api/baseApi";
import { GetProductsParams, PagedResult, Sneaker } from "../model/types";

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<PagedResult<Sneaker>, GetProductsParams | void>({
      query: (params) => ({
        url: "sneakers",
        params: params || {}, 
      }),
      providesTags: ["Sneakers"],
    }),
    getProductById: build.query<Sneaker, number>({
      query: (id) => ({
        url: `sneakers/${id}`, 
      }),
      providesTags: (result, error, id) => [{ type: "Sneakers", id }],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
