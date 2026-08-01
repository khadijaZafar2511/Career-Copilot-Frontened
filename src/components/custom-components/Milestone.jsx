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
import { replace, useNavigate } from "react-router-dom";
import { useStreak } from "../../hooks/use-streak";
import { useEffect, useRef } from "react";
import { useStartQuiz } from "../../Features/Quiz/quiz.mutation";
import {toast} from "sonner"
export default function Milestone({ mil, selected, roadmapId }) {
  const navigate = useNavigate()
  const hasShownToast = useRef(false);
  const {updateStreak}=useStreak()
  const {mutate, data: startQuiz, isLoading } = useStartQuiz();
if(isLoading) return (
  <div className="  flex  flex-col mt-25 items-center justify-center ">
    <img className="h-10 w-10" src="/loading1.gif" />
  </div>
);
  const quizHandler = () => {
    mutate(mil._id, {
      onSuccess: (startQuiz) => {
        navigate(`/quiz/${mil._id}`, { state: { quiz: startQuiz } });
      },
      onError: () => {
        toast.dismiss()
        toast.error("Error in starting quiz")
      }
  })


}

  const totalTasks = mil.tasks.length;
  const completedTasks = mil.tasks.filter(
    (t) => t.status === "completed",
  ).length;

  const progress = Math.round((completedTasks / totalTasks) * 100);
const status = {
  completed:
    "bg-green-50 text-green-700 border border-green-200 rounded p-3 mb-2 text-sm  font-semibold",
  in_progress:
    "bg-blue-50 text-blue-700 border border-blue-200 rounded p-3 mb-2 text-sm  font-semibold",
  not_started:
    "bg-gray-50 text-gray-600 border border-gray-200 rounded p-3 mb-2 text-sm  font-semibold",
  locked:
    "bg-gray-200 text-gray-500 border border-gray-200 rounded p-3 mb-2 text-sm  font-semibold  cursor-not-allowed",
};
  function getProgressColor(value) {

    if (value >= 90) return "[&>div>div]:bg-green-600";
    if (value >= 10) return "[&>div>div]:bg-orange-400";
    return "[&>div>div]:bg-red-500";
  }

  
  return (
    <>
      <div
        key={mil._id}
        className={`rounded-2xl text-sm bg-white shadow-sm md:px-4 px-1  text-gray-500  ${mil.status === "locked" ? "cursor-not-allowed" : ""}`}
      >
        <Accordion
          type="single"
          onValueChange={(val) => val && updateStreak()}
        >
          <AccordionItem value={mil._id} disabled={mil.status === "locked"}>
            <div>
              <div className="md:text-lg  text-md font-semibold flex justify-between mt-4">
                <span className="text-foreground px-1 ">{mil.title}</span>

                <Badge className={status[mil.status]}>
                  {mil.status === "locked" ? `${mil.status} 🔒︎` : mil.status}
                </Badge>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-1 md:gap-2 mt-2">
              <div>
                {`${completedTasks}/${totalTasks}`} <span>tasks completed</span>
              </div>
              <Progress
                className={`md:w-2/3 w-full h-full p-2 ${getProgressColor(progress)} *:bg-gray-200 `}
                value={progress || 1}
              />
            </div>
            <AccordionTrigger className="cursor-pointer py-0"></AccordionTrigger>
            {/* content dropdown */}
            <AccordionContent
              className={`flex flex-col gap-2 ${mil.status === "locked" ? "cursor-not-allowed" : ""}`}
            >
              <div className="flex flex-col gap-2">
                {mil.tasks.map((task,index) => {
                const firstIncompleteIndex = mil.tasks.findIndex(
                  (task) => task.status !== "completed",
                  );
                  const isLocked = index > firstIncompleteIndex;
                
                  return (
                    <Tasks
                      task={task}
                      key={task._id}
                      selected={selected}
                      roadmapId={roadmapId}
                      isLocked={isLocked}
                    />
                  )
                })}
              </div>

              <div className="flex gap-2 py-6 ">
                {/* <Link to={`/quiz/${mil._id}`}> */}
                <Button onClick={quizHandler} className="px-13 py-5  ">
                  Take Quiz
                </Button>
                {/* </Link> */}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
