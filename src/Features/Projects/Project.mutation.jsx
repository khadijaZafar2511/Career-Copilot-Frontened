import { submitProject, resubmitProject, startProject } from "./Project.api";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";


const useStartProject = (projectId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: startProject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project", projectId],
      });
    },
  });
};
const useSubmitProject = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: submitProject,
        onSuccess: ({projectId}) => {
            queryClient.invalidateQueries({
                queryKey:["project",projectId]
            })
        }
    })
}

const useReSubmitProject = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:resubmitProject,
        onSuccess: ({projectId}) => {
            queryClient.invalidateQueries({
                queryKey:["project",projectId]
           })
        }
    })
}


export {useReSubmitProject,useSubmitProject,useStartProject}