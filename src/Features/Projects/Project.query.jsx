import {
  projectDetail,
  viewSubmittedProject,
  getProject,
  allProjects,
} from "./Project.api";
import { useQuery } from "@tanstack/react-query"



const useAllProject = () => {
    return useQuery({
        queryKey: ["projects"],
        queryFn:allProjects
    })
}
const useProject = (roadmapId) => {
    return useQuery({
      queryFn: () => getProject(roadmapId),
      queryKey: ["projects"],
    });
}


const useProjectDetail = (roadmapId) => {
    return useQuery({
      queryKey: ["project", roadmapId],
      queryFn: () => projectDetail(roadmapId)
    });
}

const useSubmittedProject = (projectId) => {
    return useQuery({
        queryKey: ["project", projectId],
        queryFn:()=>viewSubmittedProject(projectId)
    })
}

export { useProject, useSubmittedProject, useProjectDetail, useAllProject };