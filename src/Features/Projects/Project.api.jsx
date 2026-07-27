import { apiClient } from "@/Api/AxiosInstance";
const allProjects = async () => {
    const response = await apiClient.get(`/project/all`)
    return response.data.message
}
const getProject = async (roadmapId) => {
    const response = await apiClient.get(`/project/${roadmapId}/view`);
    return response.data.message;
}

const projectDetail = async (roadmapId) => {
    const response = await apiClient.get(`/project/${roadmapId}/detail`);
    return response.data.message;
}
const viewSubmittedProject = async (projectId) => {
    const response = await apiClient.get(
      `/project/${projectId}/viewsubmission`,
    );
    return response.data;
}

const submitProject = async ({ projectId, formData}) => {
  const response = await apiClient.patch(
    `/project/${projectId}/submit`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  // console.log(response);
  return response.data;
};
const resubmitProject = async ({projectId, reSubmissionData}) => {
    const response = await apiClient.patch(
      `/project/${projectId}/resubmission`,reSubmissionData
    );
    return response.data
}
const startProject = async (projectId) => {
    const response = await apiClient.post(`/project/${projectId}/start`);
    return response.data.message;
  }    
export {
    startProject ,
  projectDetail,
  viewSubmittedProject,
  getProject,
  submitProject,
  resubmitProject,
  allProjects,
};