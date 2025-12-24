"use client";

import { useEffect, useState } from "react";
import { useGetMeQuery } from "@/features/auth/api/authApi";
import { useAppDispatch, useAppSelector } from "@/shared/lib/store/redux";
import { setUser, setToken, logout } from "@/entities/session/model/sessionSlice";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.session.token);
  
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    
    if (storedToken && !token) {
      dispatch(setToken(storedToken));
    }
    
    setIsInitialized(true);
  }, [dispatch, token]);

  const { data: user, isError, isLoading } = useGetMeQuery(undefined, { 
    skip: !token,
  });

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (isError) {
      dispatch(logout());
    }
  }, [isError, dispatch]);

  if (!isInitialized) {
    return null; 
  }

  return <>{children}</>;
};