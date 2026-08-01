import {apiClient} from "../../Api/AxiosInstance";

export const sendMessage = async(data) => {
    console.log(data)
    const response =await apiClient.post("/ai/chat", data);
  
    return response.data;
};
