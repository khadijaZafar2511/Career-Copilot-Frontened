import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link,useNavigate } from "react-router-dom";
import { useMyRoadmaps} from "../Features/Roadmap/Roadmap.query"
import {
  useResumeRoadmap,
  usePauseRoadmap,
} from "@/Features/Roadmap/roadmap.mutation";

  function getProgressColor(value) {
      if (value ==="completed") return "[&>div>div]:bg-green-600";
      if(value==="paused") return "[&>div>div]:bg-orange-400";
    if (value ==="active") return "[&>div>div]:bg-blue-600";
    return "[&>div>div]:bg-red-500";
  }
const style = {
    completed: "bg-green-50 text-green-700 ",
    paused: "bg-orange-50 text-orange-400",
    active:"bg-blue-50 text-blue-700"
}
;

function Roadmap({ roadmap }) {
    const navigate=useNavigate()
    const { mutate, data: resumeRoadmap, isLoading:isResume } = useResumeRoadmap()
  const { mutate: mutatePause, data: pauseRoadmap, isLoading: isPause } = usePauseRoadmap()
  

    const pauseHandler = () => {
        if (roadmap.status === "active") {
            mutatePause(roadmap._id, {
                onSuccess: (data) => {
                    
                }
            })
        }
    }
    const resumeHandler = () => {
        if (roadmap.status === "paused") {
            mutate(roadmap._id, {
                onSuccess: (data) => {
                    // console.log(data)
                    // navigate(`/roadmap/${roadmap.roadmapId._id}`);
                }
            })
        }
    }


    const convertTime = (isoDateString) => {
         const dateObj = new Date(isoDateString);

         // 1. Simple, human-readable date and time
         const simpleFormat = new Intl.DateTimeFormat("en-US", {
           dateStyle: "medium",
           timeStyle: "short",
         }).format(dateObj);

        return simpleFormat;
    }
    
  return (
    <Card className="  gap-1 rounded-2xl shadow-sm hover:shadow-md transition py-6 px-2 md:px-4 space-y-6  grid lg:grid-cols-9 md:grid-cols-2 grid-cols-1">
      <CardHeader className="p-0 lg:col-span-4 ">
        <div className="flex items-center justify-between gap-2">
          <span className="text-3xl bg-blue-50 p-3 rounded">
            {roadmap.roadmapId.icon}
          </span>

          <CardTitle className="text-lg font-semibold flex flex-col  p-0  ">
            <div>
              <div className="text-left w-full text-foreground text-xl">
                {roadmap.roadmapId.title}
              </div>

              <p className="text-sm text-muted-foreground  ">
                {roadmap.roadmapId.description.length > 75
                  ? roadmap.roadmapId.description.slice(0, 75)
                  : roadmap.roadmapId.description}
                .....
              </p>
            </div>
          </CardTitle>

          {/* <Badge variant="secondary">{roadmap.level}</Badge> */}
        </div>
        <div className="w-2/3 flex justify-center mt-2">
          <Badge className={`${style[roadmap.status]} py-3 px-8 `}>
            {roadmap.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 mb-0 lg:col-span-3">
        <div className="space-y-2 flex flex-col gap-2">
          <div className="text-foreground font-semibold">
            <div> Current Milestone :</div>
            <div className="text-xs text-gray-600">
              {roadmap.currentMilestone.title}
            </div>
          </div>
          <div className="flex  text-md mb-0">
            <span>Progress:</span>
            <span className={`font-semibold text-md  ${roadmap.status === ""}`}>
              {Math.round(roadmap.progress)}%
            </span>
          </div>
          <Progress
            className={` w-full h-full  ${getProgressColor(roadmap.status)} *:bg-gray-200 `}
            value={roadmap.progress || 1}
          />
        </div>
      </CardContent>
      <div className="lg:col-span-2">
        {/* Button */}
        {roadmap.status === "active" && (
          <div
            to={`/roadmap/${roadmap.roadmapId._id}`}
            className="w-full flex lg:justify-end justify-center px-2"
          >
            <Button
              onClick={pauseHandler}
              disabled={isPause}
              className="p-5 w-5/6 hover:text-white hover:bg-foreground mt-4 cursor-pointer  border-blue-600 bg-gray-50  text-foreground"
            >
              Pause ➔
            </Button>
          </div>
        )}
        {roadmap.status === "paused" && (
          <div
            // to={`/roadmap/${roadmap.roadmapId._id}`}
            className="w-full flex  lg:justify-end justify-center  px-2"
          >
            <Button
              onClick={resumeHandler} // 👈 Move onClick here
              disabled={isResume}
              className="p-5 w-2/3 mt-4 cursor-pointer hover:text-white hover:bg-orange-400 border-orange-400 bg-white  text-orange-400"
            >
              {isResume ? "resuming.." : "Resume ➔"}
            </Button>
          </div>
        )}
        {roadmap.status === "completed" && (
          <Link
            to={`/roadmap/${roadmap.roadmapId._id}`}
            className="w-full flex lg:justify-end justify-center  px-2"
          >
            <Button className="p-5 w-2/3 mt-4 cursor-pointer  border-green-600 hover:bg-green-600 hover:text-white bg-white text-green-600">
              View Roadmap ➔
            </Button>
          </Link>
        )}
        <div className="text-xs text-gray-500 mt-2 text-right">
         🕒  {convertTime(roadmap.updatedAt)}
        </div>
      </div>
    </Card>
  );
}



export default function MyRoadmap() {
       const { data:roadmaps, isLoading, isError } = useMyRoadmaps();
       if (isLoading) return <div>My roadmaps are loading</div>;
        // console.log(roadmaps)
  return (
    <>
      <div className="flex flex-col">
        {roadmaps.map((roadmap) => (
          <div className="md:px-5 lg:px-10  px-3 py-2" key={roadmap._id}>
            <Roadmap roadmap={roadmap} />
          </div>
        ))}
      </div>
    </>
  );
}
