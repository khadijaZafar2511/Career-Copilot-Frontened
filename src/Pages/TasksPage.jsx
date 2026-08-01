import { Card } from "@/components/ui/card";
import { Circle } from "rc-progress";
import {
  MdAssignment,
  MdPendingActions,
  MdCheckCircle,

} from "react-icons/md";
import { useState} from "react";
import { Button } from "@/components/ui/button";
import { useActiveRoadmap } from "@/Features/Roadmap/Roadmap.query";
import { Badge } from "@/components/ui/badge";
const items = [
  // { label: "Milestone", value: null },
  { label: "Frontened", value: "frontend-developer" },
  { label: "Backened", value: "backend-developer" },
  { label: "AI Career", value: "ai-engineer" },
  { label: "Dev ops enginner", value: "devops-engineer" },
  { label: "Full Stack", value: "fullstack-developer" },
];


export default function TasksPage() {
  const [tasksData, setTasksData] = useState(null);
   const [selectedValue, setSelectedValue] = useState("");
const[activeFilter,setActiveFilter]=useState("all")
  const { data: activeRoadmap, isLoading } = useActiveRoadmap()
  const status = {
    completed:
      "bg-green-50 text-green-700 border border-green-200 rounded-full p-1 mb-2   font-semibold",
    incomplete:
      "bg-blue-50 text-blue-700 border border-blue-200 rounded-full p-1 mb-2  font-semibold",
    not_started:
      "bg-gray-50 text-gray-600 border border-gray-200 rounded-full p-1 mb-2   font-semibold",
    locked:
      "bg-gray-200 text-gray-500 border border-gray-200 rounded-full p-1 mb-2  font-semibold  cursor-not-allowed",
  };
  const filters = [
      "all",
      "completed",
      "in_progress",
      "locked"
    ];
  if (isLoading)
    return (
      <div className="  flex  flex-col mt-25 items-center justify-center ">
        <img className="h-10 w-10" src="/loading1.gif" />
      </div>
    );
  if(!activeRoadmap) return <div> You have no active Roadmap yet !</div>
  const progress = Math.round((activeRoadmap.completedTasks / activeRoadmap.totalTasks) * 100)
  const allTasks = activeRoadmap.milestones.flatMap(milestone => milestone.tasks)
  const filteredTasks = allTasks.filter(task => {
    const matchedTask = activeFilter === "all" || task.status.includes(activeFilter)
    return matchedTask;
  })
  return (
    <>
      <div className=" min-h-screen md:max-w-5xl lg:max-w-7xl px-3  bg-gray-50  max-w-4xl w-full mx-auto ">
        {/* <div className="p-2 text-2xl font-semibold">{activeRoadmap.title}</div> */}
        {activeRoadmap && (
          <div className=" mb-2 ">
            <Card className=" border-gray-300 border flex flex-row md:gap-13   gap-5 py-6 md:px-8 px-3  border-none   *:mb-0">
              <div className="md:ml-4 flex flex-col gap-3 ">
                <div className="flex gap-2 ">
                  <MdAssignment
                    className="bg-gray-100 p-1  rounded-full"
                    size={30}
                    color="#6c757d"
                  />

                  <p className="text-sm text-gray-500">
                    Total Tasks :{" "}
                    <span className="p-2 md:text-base text-sm font-semibold">
                      {activeRoadmap.totalTasks}
                    </span>
                  </p>
                </div>

                <div className="flex gap-3">
                  <MdPendingActions
                    className="bg-orange-100 p-1 rounded-full "
                    size={30}
                    color="#f59e0b"
                  />

                  <div className="flex flex-col ">
                    <p className="text-sm text-gray-500">
                      Pending Tasks :
                      <span className="p-2 md:text-base text-sm  font-semibold">
                        {activeRoadmap.totalTasks -
                          activeRoadmap.completedTasks}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <MdCheckCircle
                    className="bg-green-100 p-1 rounded-full "
                    size={30}
                    color="#50C878"
                  />

                  <div className="flex flex-col ">
                    <p className="text-sm text-gray-500">
                      Completed Tasks :
                      <span className="p-2 md:text-base text-sm  font-semibold">
                        {activeRoadmap.completedTasks}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-20 h-20 lg:w-26 lg:h-26  relative flex items-center justify-center">
                <Circle
                  percent={activeRoadmap.roadmapProgress}
                  strokeWidth={8}
                  trailWidth={8}
                  strokeColor="var(--primary)" // Matches your Shadcn primary theme color
                  trailColor="var(--muted)" // Matches your Shadcn muted track color
                  strokeLinecap="round" // This makes the progress edge perfectly round!
                />
                <div className="absolute flex flex-col items-center justify-center text-center line-height-none">
                  <span className="text-sm text-foreground font-bold leading-none">
                    {activeRoadmap.roadmapProgress}%
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium tracking-wide mt-0.5">
                    progress
                  </span>
                </div>
              </div>
              {/* <div>Current Roadmap Progress</div> */}
              {/* <div className="w-1/3 ">{activeRoadmap.title }</div> */}
            </Card>
          </div>
        )}

        <div className="grid lg:grid-cols-3 grid-col-1 gap-2 ">
          <Card className=" lg:col-span-2  ">
            <div className=" bg-white px-3  py-2 rounded md:p-6">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground">
                  All Tasks
                </h1>
                <div className="flex gap-2 flex-wrap mt-3 ">
                  {filters.map((f) => (
                    <Button
                      key={f}
                      variant={activeFilter === f ? "default" : "outline"}
                      onClick={() => setActiveFilter(f)}
                      className="rounded-full"
                    >
                      {f}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1 text-xs md:text-sm h-130 overflow-y-scroll scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-500  mb-0 px-0 ">
                {filteredTasks.length>0?
                  filteredTasks.map((task) => (
                    <div
                      key={task._id}
                      className="flex gap-2  border p-2 rounded-md hover:bg-blue-100"
                    >
                      <div className="w-4 h-4 rounded-full border border-foreground"></div>
                      <div className="font-medium ">
                        {task.type} : {task.title}
                      </div>
                      <Badge className={status[task.status]}>
                        {task.status}
                      </Badge>
                    </div>
                  )): (
                    <div className="text-xl text-foreground flex items-center justify-center mt-10 ">No matched task has found </div>
                  )}
              </div>
            </div>
          </Card>
          <Card className=" lg:col-span-1 h-90 lg:h-100 text-foreground">
            <div className=" bg-white px-3  py-2 rounded md:p-6">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-xl font-bold">Your Next Tasks</h1>
                <p className="text-gray-500 text-sm">
                  Follow your personalized learning path step by step
                </p>
              </div>
              <div className="flex flex-col gap-1 text-xs md:text-sm mb-0 px-0 ">
                {activeRoadmap.nextTask.map((task) => (
                  <div
                    key={task._id}
                    className="flex gap-3 border p-2 rounded-md hover:bg-blue-100"
                  >
                    <div className="w-4 h-4 rounded-full border border-foreground"></div>
                    <div className="font-medium ">{task.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
