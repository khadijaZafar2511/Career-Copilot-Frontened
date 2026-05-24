import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MdAssignment,
  MdPendingActions,
  MdCheckCircle,
  MdAutorenew,
} from "react-icons/md";
import { useState, useEffect } from "react";
import SelectItems from "@/Components/custom-components/Selector"
import Tasks from "@/Components/custom-components/Tasks"
import { FaChartLine } from "react-icons/fa";
// import { LuTrendingUp, LuLineChart } from "react-icons/lu";
const items = [
  { label: "Milestone", value: null },
  { label: "Frontened", value: "frontened" },
  { label: "Backened", value: "backened" },
  { label: "AI Career", value: "ai" },
  { label: "Dev ops enginner", value: "dev oops eng" },
  { label: "Data Analyst", value: "data analyst" },
];

export default function TasksPage() {
    const [tasksData, setTasksData]=useState(null)
  // const [completedTasks, setCompletedTasks] = useState(0)
  // const [totalTasks, setTotalTasks] = useState(0)
  // const [pendingTasks, setPendingTasks] = useState(0)
  
    useEffect(() => {
            const fetchdata = async () => {
              const res = await fetch("/Tasksdata.json");
              const data = await res.json();
         const sortedTasks = [...data.tasks].sort((a, b) => {
           const order = { in_progress: 0, not_started: 1, completed: 2 };
           return order[a.status] - order[b.status];
         })
            //   console.log(sortedTasks.length)
            //   const tasksCompleted = sortedTasks.filter((task) => task.status === "completed").length
            //   const tasksPending = sortedTasks.filter((task) => task.status !== "completed").length
            //   setCompletedTasks(tasksCompleted)
            //   setPendingTasks(tasksPending)
            // setTotalTasks(sortedTasks.length)
              setTasksData({
                ...data,
                tasks: sortedTasks,
              });
               };
     
       fetchdata();
      


      }, []);

  return (
    <>
      <div className=" min-h-screen md:max-w-5xl lg:max-w-6xl  max-w-4xl w-full mx-auto ">
        {tasksData && (
          <div className="w-full grid lg:grid-cols-4  sm:grid-cols-2 grid-cols-1 gap-3 md:gap-1 py-5 px-10 lg:px-4  *:px-3 *:ml-2  *:py-5 *:flex *:flex-col *:gap-2 *:lg:gap-4">
            <Card className="border-gray-300 border">
              <div className="flex gap-3">
                <MdAssignment
                  className="bg-gray-100 p-2 rounded-full"
                  size={40}
                  color="#6c757d"
                />

                <div className="flex flex-col ">
                  <p className="text-sm text-gray-500">Total Tasks</p>
                  <p className="p-2 text-2xl font-bold">
                    {tasksData.stats.totalTasks}
                  </p>
                </div>
              </div>
              <div className=" text-gray-500 flex justify-between p-1 ">
                <span>All assigned tasks</span>
                <FaChartLine size={23} color="#6c757d" />
              </div>
            </Card>
            <Card className="border-gray-300 border">
              <div className="flex gap-3">
                <MdPendingActions
                  className="bg-orange-100 p-2 rounded-full "
                  size={40}
                  color="#f59e0b"
                />

                <div className="flex flex-col ">
                  <p className="text-sm text-gray-500">Pending Tasks</p>
                  <p className="p-2 text-2xl font-bold">
                    {tasksData.stats.pendingTasks}
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-500 flex justify-between p-2">
                <div>
                  <span className="font-bold">
                    {Math.round(
                      tasksData.stats.pendingTasks / tasksData.stats.totalTasks,
                    ) * 100}
                    %
                  </span>{" "}
                  pending
                </div>
                <FaChartLine size={23} color="#FFA500" />
              </div>
            </Card>
            <Card className="border-gray-300 border">
              <div className="flex gap-3">
                <MdAutorenew
                  className="bg-blue-100 p-2 rounded-full "
                  size={40}
                  color="#1d4ed8"
                />

                <div className="flex flex-col ">
                  <p className="text-sm text-gray-500">In Progress Tasks</p>
                  <p className="p-2 text-2xl font-bold">
                    {tasksData.stats.completedTasks}
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-500 flex justify-between p-2">
                <div>
                  <span className="font-bold">
                    {Math.round(
                      tasksData.stats.completedTasks /
                        tasksData.stats.totalTasks,
                    ) * 100}
                    %
                  </span>{" "}
                  completed
                </div>
                <FaChartLine size={23} color="#1d4ed8" />
              </div>
            </Card>
            <Card className="border-gray-300 border">
              <div className="flex gap-3">
                <MdCheckCircle
                  className="bg-green-100 p-2 rounded-full "
                  size={40}
                  color="#10b981"
                />

                <div className="flex flex-col ">
                  <p className="text-sm text-gray-500">Completed Tasks</p>
                  <p className="p-2 text-2xl font-bold">
                    {tasksData.stats.completedTasks}
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-500 flex justify-between p-2">
                <div>
                  <span className="font-bold">
                    {Math.round(
                      tasksData.stats.completedTasks /
                        tasksData.stats.totalTasks,
                    ) * 100}
                    %
                  </span>{" "}
                  completed
                </div>
                <FaChartLine size={23} color="#10b981" />
              </div>
            </Card>
          </div>
        )}
        <div className="px-5 py-3 ">
          <SelectItems className="bg-white" items={items} />
        </div>
        <div className="px-3">
          <div className=" bg-white px-3  py-2 rounded md:p-6">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Your Tasks</h1>
              <p className="text-gray-500 text-sm">
                Follow your personalized learning path step by step
              </p>
            </div>

            {/* Task List (1 Column Layout) */}
            <div className="space-y-4">
              {tasksData &&
                tasksData?.tasks?.map((task) => (
                  <Card
                    key={task.id}
                    className="p-3 gap-0 text-gray-600 border border-blue-100 hover:border hover:border-blue-500 "
                  >
                    <Tasks task={task} />
                    <Badge className="text-foreground font-bold bg-blue-50 p-3">
                      {task.roadmapType}
                    </Badge>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

