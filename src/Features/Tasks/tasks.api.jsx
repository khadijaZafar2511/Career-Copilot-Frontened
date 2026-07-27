import { apiClient } from "../../Api/AxiosInstance";

const selectTask = async ({selected, task}) => {
  // console.log(selected)
  const taskcompleted = await apiClient.post(
    `/progress/complete/userRoadmap/${selected}/task/${task._id}`,
    );
    
    return taskcompleted.data;
};

export {selectTask}