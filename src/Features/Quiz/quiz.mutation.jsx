
import { submitQuiz ,startQuiz} from "./quiz.api";
import { useMutation,useQueryClient } from "@tanstack/react-query";

const useSubmitQuiz = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: submitQuiz,
        onSuccess: (data, { milestoneId }) => {
        //    console.log(milestoneId);
            queryClient.invalidateQueries({
                queryKey:["Quiz",milestoneId]
            })
        }
    })
}

const useStartQuiz = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: startQuiz,
        onSuccess: (data,milestoneId) => {
            queryClient.invalidateQueries({
                queryKey:["Quiz",milestoneId]
            })
        }
    })
}

export { useSubmitQuiz, useStartQuiz };