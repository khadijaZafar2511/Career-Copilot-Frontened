import { apiClient } from "@/Api/AxiosInstance";

const getQuiz = async(milestoneId) => {
    const response =await  apiClient.get(`/quiz/${milestoneId}`);
    // console.log(response.data.message)
  return response.data.message;
};

const submitQuiz = async ({ id, answers }) => {
  const response = await apiClient.post(`/quiz/${id}/submit`, answers);

  return response.data;
};
const startQuiz = async(milestoneId) => {
    const response = await apiClient.post(`/quiz/${milestoneId}/start`);
    // console.log(response)
    return response.data;
}
const getQuizAttempts =async () => {
    const response = await apiClient.get(`/quiz/attempts`);
    return response.data;
}
const getAllQuizAttempts = async(attemptId) => {
    const response = await apiClient.get(`/quiz/attempts/${attemptId}`)
    return response.data;
}

const reAttemptQuiz =async (attemptedQuizId) => {
    const response=await apiClient(`/quiz/${attemptedQuizId}/reAttempt`)
    return response.data;
}


export {reAttemptQuiz,getAllQuizAttempts,getQuizAttempts,getQuiz,submitQuiz,startQuiz}