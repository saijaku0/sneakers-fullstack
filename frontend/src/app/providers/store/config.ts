import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "@/shared/api/baseApi";
import { sessionSlice } from "@/entities/session";

export const store = () => {
  return configureStore({
    reducer: {
      // Add your reducers here
      session: sessionSlice.reducer,
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
