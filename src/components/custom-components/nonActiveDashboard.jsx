import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect, useMemo, lazy, Suspense } from "react";

const Questions = lazy(
  () => import("@/components/custom-components/Questions"),
);
const CareerPath = lazy(
  () => import("@/components/custom-components/CareerPath"),
);
const SetGoal = lazy(() => import("@/components/custom-components/SetGoal"));
const StartLearning = lazy(
  () => import("@/components/custom-components/StartLearning"),
);

export default function NonActiveDashboard() {
  const [selected, setSelected] = useState({ title: "", description: "" });

  const [filledtab, setFilledtab] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("filledtabs");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [goalData, setGoalData] = useState({
    career: selected ? selected.title : "",
    roadmapId: selected ? selected.id : "",
    skillLevel: "beginner",
    TargetPace: "",
    weeklyHours: "",
    timeline: "",
    dailyReminder: "",
  });

  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("filledtabs");
      const savedTabs = saved ? JSON.parse(saved) : [];
      return savedTabs.includes(1) ? 2 : 1;
    }
    return 1;
  });

  useEffect(() => {
    setGoalData((prev) => ({
      ...prev,
      career: selected?.title || "",
      roadmapId: selected?.id || "",
    }));
  }, [selected]);

  useEffect(() => {
    localStorage.setItem("filledtabs", JSON.stringify(filledtab));
  }, [filledtab]);

  const selectPath = useMemo(
    () => [
      { id: 1, title: "Skill Assessment" },
      { id: 2, title: "Career Path" },
      { id: 3, title: "Set Goals" },
      { id: 4, title: "Start Learning" },
    ],
    [],
  );

  const bottomref = useRef();
  const careerHandler = () => {
    bottomref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="p-4 flex items-center flex-col md:px-5 px-2 w-full lg:max-w-7xl md:max-w-5xl rounded-md max-w-3xl mx-auto ">
        {/* card content */}

        <Card className="p-6 w-full bg-[url('/career.png')] bg-cover bg-top bg-no-repeat text-white ">
          <CardContent className=" p-0">
            <div className="text-xl md:text-2xl font-semibold mb-3">
              <span>Start your </span>
              <span className="">learning journey</span>
            </div>
            <div className="text-xs md:text-sm">
              Choose a career path that excites you and let the AI create a
              personalized roadmap fro you
              <br />{" "}
              <span className="font-semibold text-md">
                No experience needed • Personalized learning • Industry-focused
              </span>
            </div>
          </CardContent>
          <div className="flex flex-col md:flex-row gap-5 md:gap-11">
            <Button
              className="p-6 w-50 mt-3 text-foreground bg-white "
              onClick={careerHandler}
            >
              Choose your career path ➔
            </Button>
          </div>
        </Card>

        <Card className=" w-full relative p-6 gap-0 border-foreground border mt-1">
          <div className="flex items-center justify-center w-full md:ml-3">
            <div className="h-px px-5 mt-3 border border-dashed border-foreground w-15/16 "></div>
          </div>

          <div className="flex gap-4 justify-between items-center ">
            {selectPath.map((p) => (
              <div key={p.id} className="flex flex-col ">
                <div
                  onClick={() => setActiveTab(p.id)}
                  className={`h-8 w-8 border rounded-full flex items-center justify-center absolute top-5 ${
                    activeTab == p.id || filledtab.find((pid) => pid == p.id)
                      ? "bg-foreground text-white"
                      : "bg-white"
                  } `}
                >
                  {p.id}
                </div>
                <div className="md:text-sm text-[10px] md:font-semibold">
                  {p.title}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="px-2 md:px-8 py-4 w-full mt-2 bg-gray-50">
          <Suspense
            fallback={
              <div className="flex flex-col items-center justify-center p-12 text-slate-500">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-900 border-t-transparent mb-2"></div>
                <p className="text-xs font-medium">Loading layout...</p>
              </div>
            }
          >
            {activeTab == 2 && (
              <CareerPath
                setActiveTab={setActiveTab}
                setFilledtab={setFilledtab}
                selected={selected}
                setSelected={setSelected}
                setGoalData={setGoalData}
                goalData={goalData}
              />
            )}
            {activeTab == 1 && (
              <Questions
                setActiveTab={setActiveTab}
                setFilledtab={setFilledtab}
              />
            )}
            {activeTab == 3 && (
              <SetGoal
                setActiveTab={setActiveTab}
                setFilledtab={setFilledtab}
                selected={selected}
                setSelected={setSelected}
                setGoalData={setGoalData}
                goalData={goalData}
              />
            )}
            {activeTab == 4 && (
              <StartLearning
                goalData={goalData}
                setFilledtab={setFilledtab}
                selected={selected}
              />
            )}
          </Suspense>

          <div ref={bottomref} />
        </Card>
      </div>
    </>
  );
}
