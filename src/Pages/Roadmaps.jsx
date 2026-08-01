import { useEffect ,useState} from "react";
import RoadmapCard from "../components/custom-components/RoadmapCard";
import  {  useAllRoadmaps } from "../Features/Roadmap/Roadmap.query"


export default function Roadmaps() {

  const { data: roadmapData, isLoading, isError } = useAllRoadmaps()
  if(isLoading) return   <div className="  flex  flex-col mt-25 items-center justify-center ">
          <img className="h-10 w-10" src="/loading1.gif" />
        </div>

  return (
    <>
     {/* {console.log("roadmaps",roadmapData)} */}
{  roadmapData &&    <div className="md:px-5 px-1">
        <div className="bg-gray-50 px-2 md:px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4 w-full max-w-6xl mx-auto bg-gray-50 ">
            {roadmapData.map((roadmap) => (
              <div key={roadmap._id}>
                <RoadmapCard roadmap={roadmap} />
              </div>
            ))}
          </div>
        </div>
      </div>}
    </>
  );
}
