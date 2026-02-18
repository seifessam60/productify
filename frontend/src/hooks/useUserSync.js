import { useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { syncUser } from "../lib/api";

const useUserSync = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  const {
    mutate: syncUserMutation,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: syncUser,
    onSuccess: () => {
      console.log("User synced successfully");
    },
    onError: (error) => {
      console.error("Failed to sync user:", error);
    },
  });

  useEffect(() => {
    if (isSignedIn && user && !isPending && !isSuccess) {
      syncUserMutation({
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName || user.firstName,
        imageUrl: user.imageUrl,
      });
    }
  }, [user, isSignedIn, syncUserMutation, isPending, isSuccess]);

  return { isSynced: isSuccess };
};

export default useUserSync;
