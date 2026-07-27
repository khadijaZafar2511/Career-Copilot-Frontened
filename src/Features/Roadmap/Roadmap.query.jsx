import { useQuery } from "@tanstack/react-query";
import {
  allRoadmaps,
  roadmapDetail,
  myRoadmaps,
  activeRoadmap,
} from "./roadmap.api";

const useRoadmap = (id) => {
  return useQuery({
    queryKey: ["roadmap",id],
    queryFn:()=> roadmapDetail(id),
  });
};

const useAllRoadmaps = () => {
 return useQuery({
    queryKey: ["roadmaps"],
    queryFn: allRoadmaps,
  });
};

const useMyRoadmaps = () => {
  return useQuery({
    queryKey: ["myroadmaps"],
    queryFn:myRoadmaps
  })
}

const useActiveRoadmap = () => {
  return useQuery({
    // queryKey: ["myroadmap"],
    queryFn: activeRoadmap,
  });
}


export { useRoadmap, useAllRoadmaps, useMyRoadmaps, useActiveRoadmap };
