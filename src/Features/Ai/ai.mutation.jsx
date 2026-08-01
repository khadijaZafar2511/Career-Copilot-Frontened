import {  useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage } from "./ai.api";
const useAi = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: sendMessage,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
            queryKey:["ai"]
            })
            console.log(data)
    }
        
    })
}

export {useAi}