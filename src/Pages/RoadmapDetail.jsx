import { useParams } from "react-router-dom";
import ROADMAP_CARDS from "@/Data/dataRoadmap";
import roadmap from "@/Data/FrintenedRoadmap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Milestone from "../components/custom-components/Milestone";
import { FaReact } from "react-icons/fa";
export default function RoadmapDetail() {
  const { slug } = useParams();
  const roadmap1 = ROADMAP_CARDS.find((card) => card.slug === slug);

  if (!roadmap1) return <h1>Roadmap Not Found</h1>;
  // const roadmap = FRONTEND_ROADMAP;

  const totalTasks = roadmap.milestones.reduce(
    (acc, mil) => acc + mil.tasks.length,
    0,
  );
  const completedTasks = roadmap.milestones.reduce(
    (acc, mil) =>
      acc + mil.tasks.filter((task) => task.status !== "not_started").length,
    0,
  );
  const per = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="relative  w-full lg:max-w-6xl md:max-w-5xl rounded-md  max-w-3xl mx-auto flex sm:flex-row flex-col  bg-white  p-2">
      <div className="md:p-4 px-3 py-4  ">
        {/* header Content */}
        <div className="p-0 lg:p-4 flex gap-2">
          <div className="md:h-22 md:w-28 h-18 w-35 mt-1 bg-blue-100 md:mr-4 rounded p-3 ">
            <FaReact className="text-cyan-500 md:size-16 size-13 animate-spin-slow" />
          </div>
          <div>
            <span className="md:text-xl text-lg py-2 text-black font-bold ">
              {roadmap.title}
            </span>
            <br />
            <span className="text-gray-700 text-sm">{roadmap.description}</span>
          </div>
        </div>

        {/* lower conetnt */}
        <div className="flex w-full gap-5">
          <div className="bg-gray-200 w-0.5  mt-22 min-h-full"></div>

          <div className="flex  flex-col gap-3 rounded w-full mt-10 ">
            {roadmap.milestones
              .filter(Boolean) // 👈 This removes undefined/null items from the array
              .map((mil) => (
                <>
                  <div className="flex" key={mil.id}>
                    <div className=" h-5 w-5 text-[12px]  border bg-foreground rounded-xl absolute left-3 md:left-4 mt-12 text-white text-center">
                      {mil.order}
                    </div>
                    <div className="border border-gray-300 rounded-md w-full">
                      <Milestone mil={mil} />
                    </div>
                  </div>
                </>
              ))}
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="space-y-6 p-4 ">
        {/* Overall Progress */}
        <Card className="rounded-2xl shadow-sm p-5">
          <CardHeader>
            <CardTitle className="text-base font-bold">
              Overall Progress
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <p className="text-2xl font-bold">{per}%</p>

            <Progress max="100" value={90} />

            <p className="text-xs text-muted-foreground">
              {completedTasks} / {totalTasks} tasks completed
            </p>

            <Button className="rounded-md px-7 py-5">Continue Learning</Button>
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
              value={roadmap.totalMilestones}
            />
            <SummaryRow label="Total Projects" value={roadmap.totalProjects} />
            <SummaryRow label="Total Quizzes" value={roadmap.totalQuizzes} />
            <SummaryRow label="Total Tasks" value={totalTasks} />
          </CardContent>
        </Card>
      </div>
    </div>
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
