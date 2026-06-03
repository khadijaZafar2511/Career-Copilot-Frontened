import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Tasks from "@/components/custom-components/Tasks";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
export default function Milestone({ mil }) {
  const totalTasks = mil.tasks.length;
  const completedTasks = mil.tasks.filter(
    (t) => t.status !== "not_started",
  ).length;

  const progress = Math.round((completedTasks / totalTasks) * 100);
  const status = {
    completed: "bg-green-50 mb-2 text-green-400 p-2",
    in_progress: "bg-orange-50 mb-2 text-orange-400 p-2",
    not_started: "bg-gray-100 text-gray-500 p-2",
  };
  function getMilestoneStatus() {
    if (completedTasks === 0) return "not_started";
    if (completedTasks < totalTasks) return "in_progress";
    if (completedTasks === totalTasks) return "completed";
    return "completed";
  }

  const milestoneStatus = getMilestoneStatus(mil.tasks);

  function getProgressColor(value) {
    if (value >= 90) return "[&>div>div]:bg-green-500";
    if (value >= 10) return "[&>div>div]:bg-orange-400";
    return "[&>div>div]:bg-red-500";
  }
  return (
    <>
      <div className="rounded-2xl text-sm bg-white shadow-sm px-4  text-gray-500">
        <Accordion type="single" collapsible="true">
          <AccordionItem value={mil.id}>
            <div>
              <div className="text-lg font-semibold flex justify-between mt-4">
                <span className="text-foreground">{mil.title}</span>

                <Badge className={status[milestoneStatus]}>
                  {milestoneStatus}
                </Badge>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-1 md:gap-2 mt-2">
              <div>
                {`${completedTasks}/${totalTasks}`} <span>tasks completed</span>
              </div>
              <Progress
                className={`md:w-2/3 w-full h-full p-2 ${getProgressColor()} *:bg-gray-200 `}
                value={progress || 10}
              />
            </div>
            <AccordionTrigger></AccordionTrigger>
            {/* content dropdown */}
            <AccordionContent className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                {mil.tasks.map((task) => (
                  <Tasks task={task} />
                ))}
              </div>

              <div className="flex gap-2 py-6 ">
                <Link to="/quiz">
                  <Button className="px-13 py-5  ">Take Quiz</Button>
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
