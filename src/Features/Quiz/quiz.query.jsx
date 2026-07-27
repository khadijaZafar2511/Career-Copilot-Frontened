import { getQuiz } from "./quiz.api";
import { useQuery } from "@tanstack/react-query";

const useGetQuiz = (milestoneId) => {
    return useQuery({
      queryFn: () => getQuiz(milestoneId),
      queryKey: ["Quiz",milestoneId],
    });
}

export { useGetQuiz };