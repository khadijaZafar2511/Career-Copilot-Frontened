import { selectRoadmap, resumeRoadmap, pauseRoadmap } from "./roadmap.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {toast} from "sonner"
 const useSelectRoadmap = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: selectRoadmap,
      onMutate: async(roadmapId) => {
          await queryClient.cancelQueries({ queryKey: ["roadmap", roadmapId] })
          const prevRoadmap = queryClient.getQueryData({
              queryKey:["roadmap",roadmapId]
          })
          queryClient.setQueryData(["roadmap", roadmapId], (oldData) => {
              if (!oldData) return oldData;
              return {
                  ...oldData,
                  status:"active"
              }
          })
           return { prevRoadmap, roadmapId };
      },
      onError: (err,variables,context) => {
            if (context?.prevRoadmap) {
              // Replaces the checked state back with the original unchecked snapshot
              queryClient.setQueryData(
                ["roadmap", context.roadmapId],
                context.prevRoadmap,
              );
            }
            toast.error("Network error. Task could not be completed.");
      },
      onSettled: (data,err,roadmapId) => {
          queryClient.invalidateQueries({
              queryKey:["roadmap",roadmapId]
          });
           queryClient.invalidateQueries({
             queryKey: ["roadmaps"], 
           });
      }
  
  });
};

const useResumeRoadmap = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: resumeRoadmap,
    onMutate: async (userRoadmapId) => {
      await queryClient.cancelQueries({
        queryKey: ["myroadmap", userRoadmapId],
      });
      const prevData = queryClient.getQueriesData(["myroadmap", userRoadmapId]);
      queryClient.setQueriesData(["myroadmap", userRoadmapId], (oldData) => {
          if (!Array.isArray(oldData)) return oldData;

          // Loop through the list and update only the clicked item
          return oldData.map((item) =>
            item._id === userRoadmapId ? { ...item, status: "active" } : item.status==="active"?{...item,status:"paused"}:item,
          );
      });
      return { prevData, userRoadmapId };
    },
    onError: (err, variables, context) => {
      // FIX 2 & 3: Check correct context property and restore previous cache state
      if (context?.prevData !== undefined) {
        queryClient.setQueryData(
          ["myroadmap", context.userRoadmapId],
          context.prevData,
        );
      }
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["myroadmap", variables],
      });
    },
  
  });
}

const usePauseRoadmap = () => {
   const queryClient = useQueryClient();
   return useMutation({
     mutationFn: pauseRoadmap,
     onMutate: async(userRoadmapId) => {
       await queryClient.cancelQueries({ queryKey: ["myroadmap", userRoadmapId] })
       const previousData = queryClient.getQueriesData(["myroadmap", userRoadmapId])
       
       queryClient.setQueriesData(["myroadmap", userRoadmapId], (oldData) => {
         if (!Array.isArray(oldData)) return oldData;
         return oldData.map(item => 
           item._id===userRoadmapId?{...item,status:"paused"}:item
         )
       })
       return{previousData,userRoadmapId}
     },
     onError: (err,variables,context) => {
    if (context?.previousData !== undefined) {
      queryClient.setQueryData(
        ["myroadmap", context.userRoadmapId],
        context.previousData,
      );
    }
     },
     onSettled: (data,error,variables) => {
        queryClient.invalidateQueries({
          queryKey: ["myroadmap", variables],
        });
     }
    
    //  onSuccess: (data, userRoadmapId) => {
    //    queryClient.invalidateQueries({
    //      queryKey: ["myroadmap", userRoadmapId],
    //    });
    //     queryClient.invalidateQueries({
    //       queryKey: ["roadmap", data.roadmapId],
    //     });
    //  },
   });
}



export { useSelectRoadmap, useResumeRoadmap, usePauseRoadmap };