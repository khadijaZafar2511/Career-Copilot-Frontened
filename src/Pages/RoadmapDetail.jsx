import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Milestone from "../components/custom-components/Milestone";
import { useEffect ,useState} from "react";
import { useRoadmap } from "../Features/Roadmap/Roadmap.query";
import {useSelectRoadmap } from "../Features/Roadmap/roadmap.mutation"
import { useRequireAuth } from "../hooks/use-require-auth"
import { toast } from "sonner"
import {Link} from "react-router-dom"
export default function RoadmapDetail() {

    const { enforceAuth } = useRequireAuth();
  const { id } = useParams();
  const [selected, setSelected] = useState(null);
  
   const { data: roadmap, isPending: isLoadingRoadmap } = useRoadmap(id);
   const { mutate, isPending: isSelecting } = useSelectRoadmap();

  
  useEffect(() => {
    if (roadmap?._id) {
      const cachedSelection = localStorage.getItem(roadmap._id);
      setSelected(cachedSelection);
    }
    
  }, [roadmap?._id]);

 
  

  if (isLoadingRoadmap) 
      return (
        <div className="  flex  flex-col mt-25 items-center justify-center ">
          <img className="h-10 w-10" src="/loading1.gif" />
          {/* <h1 className="font-semibold text-2xl mt-15">
            Loading Dashboard ......
          </h1> */}
        </div>
      );
 
  const isAlreadySelected = roadmap?.status === "active";
 
  // if (roadmap) {
  const totalTasks =
    roadmap?.milestones?.reduce(
      (acc, mil) => acc + (mil.tasks?.length || 0),
      0,
    ) || 0;
  const completedTasks =
    roadmap?.milestones?.reduce(
      (acc, mil) =>
        acc + (mil.tasks?.filter((t) => t.status === "completed").length || 0),
      0,
    ) || 0;

  const per =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 100;
// }
  const handleRoadmapSelection = async (roadmapId) => {

    mutate(roadmapId, {
      onSuccess: (response) => {
        localStorage.setItem(roadmapId, response._id);
        setSelected(response._id)
      },
      // onError: (error) => {
      //   toast.dismiss();
      //   toast.error("roadmap selection failed")
      // }
    })
  }



   
  return (
    <>
      {/* {console.log(roadmap)} */}
      {roadmap && (
        <div className="relative  w-full lg:max-w-6xl md:max-w-5xl rounded-md  max-w-3xl mx-auto flex lg:flex-row flex-col  bg-white  p-2">
          <div className="md:px-4 px-2  py-1  ">
            <div className="flex justify-between">
              <div className="mb-3">Version v.{roadmap.version}</div>
              <button
                onClick={enforceAuth(() => handleRoadmapSelection(roadmap._id))}
                disabled={isSelecting}
                className=" h-8 w-20   lg:font-semibold lg:h-9 lg:w-25 text-xs rounded  border border-foreground text-foreground hover:bg-foreground hover:text-white cursor-pointer"
              >
                {roadmap.status === "active" ? "SELECTED" : "SELECT"}
              </button>
            </div>
            {/* header Content */}
            <div className="p-0 lg:p-4 flex  gap-2">
              <div className="lg:text-4xl text-3xl text-top p-2 h-2/3 lg:p-4 bg-blue-100 ">
                {/* <FaReact className="text-cyan-500 md:size-16 size-13 animate-spin-slow" /> */}
                {roadmap.icon}
              </div>
              <div>
                <div className="w-full flex justify-between">
                  <span className="md:text-xl text-lg  text-black font-bold ">
                    {roadmap.title}
                  </span>
                </div>
                <div className="text-gray-700 text-sm">
                  {roadmap.description}
                </div>
              </div>
            </div>

            {/* lower conetnt */}
            <div className="flex w-full  gap-5">
              <div className="bg-gray-200 w-0.5   mt-22 min-h-full"></div>

              <div className="flex  flex-col gap-3 rounded w-full mt-10 ">
                {roadmap.milestones
                  .filter(Boolean) // 👈 This removes undefined/null items from the array
                  .map((mil) => (
                    // <>
                    <div className="flex" key={mil._id}>
                      <div className=" h-5 w-5 text-[12px]  border bg-foreground rounded-xl absolute left-3 md:left-4 mt-12 text-white text-center">
                        {mil.order}
                      </div>
                      <div className="border border-gray-300 rounded-md w-full">
                        <Milestone
                          mil={mil}
                          selected={selected}
                          roadmapId={roadmap._id}
                        />
                      </div>
                    </div>
                    // </>
                  ))}
              </div>
            </div>
            <Link to={`/projects/${roadmap._id}/detail`}>
              <Button className="px-4 py-5   mt-5 w-1/2 border border-foreground text-foreground bg-white hover:bg-foreground hover:text-white cursor-pointer ">
               View Project
              </Button>
            </Link>
          </div>

          {/* RIGHT SECTION */}
          <div className="space-y-6 p-4 ">
            {/* Overall Progress */}
            <Card className="rounded-2xl shadow-sm p-3 ">
              <CardHeader>
                <CardTitle className="text-base font-bold">
                  Overall Progress
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                <p className="text-2xl font-bold">{Math.round(per)}%</p>

                <Progress max="100" value={per} />

                <p className="text-xs text-muted-foreground">
                  {completedTasks} / {totalTasks} tasks completed
                </p>

                <Button className="rounded-md px-7 py-5 cursor-pointer">
                  {roadmap.status === "active"
                    ? "Continue Learning"
                    : "Not Selected Yet"}
                </Button>
              </CardContent>
            </Card>

            {/* Roadmap Summary */}
            <Card className="rounded-2xl shadow-sm ">
              <CardHeader>
                <CardTitle className="text-base font-bold">
                  Roadmap Summary
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3 text-sm">
                <SummaryRow
                  label="Total Milestones"
                  value={roadmap.milestones.length}
                />
                <SummaryRow
                  label="Total Projects"
                  value={roadmap.totalProjects}
                />
                <SummaryRow
                  label="Total Quizzes"
                  value={roadmap.totalQuizzes}
                />
                <SummaryRow label="Total Tasks" value={roadmap.totalTasks} />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between">
      <p className="text-muted-foreground">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
