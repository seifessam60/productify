import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import axiosInstance from "../lib/axios";

const useAuthReq = () => {
  const { getToken, isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
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
    };
  }, [getToken, isSignedIn]);

  return { isSignedIn, isClerkLoaded: isLoaded };
};

export default useAuthReq;
