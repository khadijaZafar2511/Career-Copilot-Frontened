import { useMutation, useQueryClient } from "@tanstack/react-query";
import { selectTask } from "./tasks.api";
import {toast} from "sonner"
export const useTaskSelect = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: selectTask,

    onMutate: async ({ roadmapId, task }) => {
      await queryClient.cancelQueries({ queryKey: ["roadmap", roadmapId] });

      // 1. Save a snapshot of the current unchecked state
      const previousRoadmap = queryClient.getQueryData(["roadmap", roadmapId]);

      // 2. FORCE the task to be checked instantly in the UI
      queryClient.setQueryData(["roadmap", roadmapId], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          milestones: oldData.milestones.map((mil) => ({
            ...mil,
            tasks: mil.tasks.map((t) =>
              t._id === task._id ? { ...t, status: "completed" } : t
            ),
          })),
        };
      });

      // 3. Pass the backup snapshot to the error handler
      return { previousRoadmap, roadmapId };
    },

    // ❌ 4. AUTOMATIC UNCHECK: If the backend fails, this runs immediately
    onError: (err, variables, context) => {
      if (context?.previousRoadmap) {
        // Replaces the checked state back with the original unchecked snapshot
        queryClient.setQueryData(
          ["roadmap", context.roadmapId],
          context.previousRoadmap
        );
      }
      // toast.error("Network error. Task could not be completed.");
    },

    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["roadmap", variables.roadmapId],
      });
    },
  });
};

