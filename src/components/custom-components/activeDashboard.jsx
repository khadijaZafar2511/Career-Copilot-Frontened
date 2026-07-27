import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Circle } from "rc-progress";
import { Progress } from "@/components/ui/progress";
import { useStreak } from "../../hooks/use-streak"
import {useNavigate ,Link} from "react-router-dom";
export default function ActiveDashboard({ activeRoadmap }) {
    const navigate=useNavigate()
  const { streak, activeDays } = useStreak();

  const totalMilestones = activeRoadmap.milestones.length;
const completedMilestone = activeRoadmap.milestones.reduce((acc, milestone) => {
  return milestone.status === "completed" ? acc + 1 : acc;
}, 0);
    const detailRoadmap = (roadmapId) => {
   navigate(`/roadmap/${roadmapId}`);
}
   const daysOfTheWeek = [
     { label: "M", key: "Mon" },
     { label: "T", key: "Tue" },
     { label: "W", key: "Wed" },
     { label: "T", key: "Thu" },
     { label: "F", key: "Fri" },
     { label: "S", key: "Sat" },
     { label: "S", key: "Sun" },
   ];
  let name="Zafar jamal"
  return (
    <>
      {activeRoadmap && (
        <div className="min-h-screen w-full lg:max-w-7xl md:max-w-5xl rounded-md  max-w-3xl mx-auto md:px-4 px-2   flex flex-col gap-2 ">
          {/* <div>
          <div className="text-sm">Small Steps today, big change tomorrow</div>
        </div> */}
          <Card className=" mt-2 p-4 lg:px-7 lg:py-5 bg-[url('/career.png')] bg-cover bg-no-repeat text-white grid grid-cols-3 ">
            <CardTitle className="lg:col-span-2  col-span-3 space-y-2 lg:space-y-3">
              <div className="p-2 lg:text-3xl md:text-2xl text-xl font-bold">
                {activeRoadmap.title}
              </div>
              <div className="flex  text-md mb-0">
                <span>Progress :{""} </span>
                <span className="font-semibold text-md ">
                  {" "}
                  {Math.round(activeRoadmap.roadmapProgress)}%
                </span>
              </div>
              <Progress
                className=" w-2/3 mt-2  [&>div]:bg-white! bg-white! "
                value={activeRoadmap.roadmapProgress}
              />
              <div className="mt-2">
                <div className="text-sm font-bold">NextTask:</div>
                <div className="lg-text-md text-sm">
                  {activeRoadmap.nextTask[0].title}
                </div>
              </div>
              <Button
                onClick={() => detailRoadmap(activeRoadmap._id)}
                className="p-5 lg:w-1/3 w-2/3 hover:text-white hover:bg-foreground mt-4 cursor-pointer  border-blue-600 bg-gray-50  text-foreground"
              >
                Countionue Learning ➔
              </Button>
            </CardTitle>
            {/* <div></div>
          <div></div> */}
          </Card>

          {/* //  progress and task */}

          <div className="grid md:grid-cols-2 grid-cols-1 gap-2 ">
            <Card className="p-4 border-blue-400 border h-80">
              <CardTitle className="mb-1 flex justify-between">
                <div className="mb-1 font-semibold text-lg">
                  {" "}
                  ☑️ Tasks to Complete
                </div>
                <Link to={"/tasks"} className="text-sm text-foreground cursor-pointer">
                  View All
                </Link>
              </CardTitle>
              <CardContent className="flex flex-col gap-1 text-xs lg:text-sm mb-0 px-0 ">
                {activeRoadmap.nextTask.slice(0, 5).map((task) => (
                  <div
                    key={task._id}
                    className="flex gap-3 border p-2 rounded-md hover:bg-blue-100"
                  >
                    <div className="w-4 h-4 rounded-full border border-foreground"></div>
                    <div className="font-medium ">
                      {task.type} : {task.title}
                    </div>
                  </div>
                ))}
              </CardContent>
              {/* <Button className="p-5  w-full  mt-4 cursor-pointer   text-white ">
              View All task
            </Button> */}
            </Card>

            {/* secone ond */}

            <Card className="border border-blue-400 py-6 px-4 ">
              <CardTitle>
                <div className="mb-1 font-semibold text-lg">Your Progress</div>
              </CardTitle>
              <CardContent className="px-0  flex  lg:gap-6  gap-2 ">
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

                <div className="md:text-base  mt-2  space-y-1  text-xs ">
                  <div>
                    Total milestones:{" "}
                    <span className="font-semibold">
                      {completedMilestone}/{totalMilestones}
                    </span>
                  </div>
                  <div>
                    Tasks Completed:{" "}
                    <span className="font-semibold">
                      {activeRoadmap.completedTasks}/
                      {activeRoadmap.totalTasks}{" "}
                    </span>
                  </div>
                  <div>
                    Current Milestone :{" "}
                    <span className="font-semibold">
                      {activeRoadmap.currentMilestone.title}{" "}
                    </span>
                  </div>
                  <div>
                    Total Quiz: <span className="font-semibold">2/3 </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* third one */}

          <Card className="p-4 border border-blue-400">
            <div className="mb-1 font-semibold text-lg">Learning Streak </div>
            <div className="flex lg:gap-7 items-center  ">
              <div className="text-foreground font-semibold text-xs  lg:text-base ">
                7 DAYS Streak{" "}
              </div>
              <div className="flex lg:gap-2 *:p-1 ">
                <div className="flex justify-between items-center gap-1.5 pt-1">
                  {daysOfTheWeek.map((day, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center gap-1 flex-1"
                    >
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2 ${
                          activeDays.includes(day.key)
                            ? "bg-foreground border-foreground text-white shadow-sm shadow-foreground-500/20"
                            : "bg-muted/40 border-muted text-muted-foreground"
                        }`}
                      >
                        {day.label}
                      </div>
                      <span className="text-[10px] text-muted-foreground font-medium uppercase">
                        {day.key.slice(0, 2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
  }