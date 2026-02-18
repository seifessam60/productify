import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import axiosInstance from "../lib/axios";

let isInterceptorRegistered = false;
const useAuthReq = () => {
  const { getToken, isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isInterceptorRegistered) return;
    isInterceptorRegistered = true;
    const interceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        if (isSignedIn) {
          const token = await getToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    return () => {
      axiosInstance.interceptors.request.eject(interceptor);
      isInterceptorRegistered = false;
    };
  }, [getToken, isSignedIn]);

  return { isSignedIn, isClerkLoaded: isLoaded };
};

export default useAuthReq;
