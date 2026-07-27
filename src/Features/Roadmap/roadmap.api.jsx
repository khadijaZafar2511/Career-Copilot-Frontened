import { apiClient } from "../../Api/AxiosInstance";

const allRoadmaps = async () => {
  const response= await apiClient.get("/roadmap/roadmaps");
  return response.data.message;
};
const roadmapDetail = async (id) => {
  const response = await apiClient.get(`/roadmap/roadmaps/${id}`);
  return response.data.message;
};

const selectRoadmap = async (roadmapId) => {
  const response = await apiClient.post(
    `/user-roadmap/${roadmapId}/select`,
  );
  return response.data.message;
};
const resumeRoadmap = async (userRoadmapId) => {
  const response = await apiClient.patch(`/user-roadmap/${userRoadmapId}/resume`)
  return response.data;
}
const pauseRoadmap = async (userRoadmapId) => {
  const response = await apiClient.patch(
    `/user-roadmap/${userRoadmapId}/pause`,
  );
  return response.data.message;
};
const myRoadmaps = async () => {
  const response= await apiClient.get(`/user-roadmap/all`);
  return response.data.message;
}
const activeRoadmap = async () => {
  const response = await apiClient.get("/user-roadmap/active")
  return response.data.message;
}
export {
  allRoadmaps,
  roadmapDetail,
  selectRoadmap,
  myRoadmaps,
  resumeRoadmap,
  pauseRoadmap,
  activeRoadmap,
};
