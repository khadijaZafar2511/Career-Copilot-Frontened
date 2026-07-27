import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerData, loginData, logout } from "../Auth/auth.api"

export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: loginData,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user"]
            })
        }
    })
}

export const useSignUp = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: registerData,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user"],
            });
        }
    });
}

export const useLogout = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: logout,
      onSuccess: () => {
        // 1. Manually set user data to null instantly
        queryClient.setQueryData(["user"], null);

        // 2. Clear all history of this query from memory
        queryClient.removeQueries({ queryKey: ["user"] });
      },
    });
}
