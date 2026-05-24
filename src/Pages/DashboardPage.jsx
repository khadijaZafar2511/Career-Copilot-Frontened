import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link  } from "react-router-dom";
import CareerPath from "../Components/custom-components/CareerPath";
import { useState, useRef } from "react";
export default function DashboardPage() {
  const [activeTab, setActiveTab]=useState(1)
  const selectPath = [
    {
      id: 1,
      title:"Career Path"
    },
    {
      id: 2,
      title:"Skill Assessment"
    },
    {
      id: 3,
      title:"Set Goals"
    },
    {
      id: 4,
      title:"Start Learning"
    }
  ]
  const bottomref = useRef();
  const careerHandler = () => {
     bottomref.current.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <>
      <div className="p-4 flex items-center flex-col max-w-5xl md:max-w-6xl mx-auto">
        {/* card content  */}

        <Card className="p-6 w-full   ">
          <CardContent className="text-black p-0">
            <div className="text-xl md:text-2xl font-semibold mb-3">
              <span>Start your </span>
              <span className="text-foreground">learning journey</span>
            </div>
            <span>
              Choose a career path that excites you and let the AI create a
              personalized roadmap fro you
            </span>
          </CardContent>
          <Button className="p-6 w-50" onClick={careerHandler}>
            Choose your career path ➔
          </Button>
        </Card>

        <Card className="md:w-2/3 w-full  mt-3  relative p-6 gap-0 ">
          <div className="flex items-center justify-center   w-full md:ml-3">
            <div className="h-px px-5 mt-3 border border-dashed w-15/16 "></div>
          </div>

          <div className="flex gap-4 md:justify-between  items-center ">
            {selectPath.map((p) => (
              <div key={p.id} className="flex flex-col ">
                <div
                  onClick={() => setActiveTab(p.id)}
                  className={`h-8 w-8  border rounded-full flex items-center justify-center absolute  top-5 ${activeTab == p.id ? "bg-foreground text-white" : "bg-white"} `}
                >
                  {p.id}
                </div>
                <div className="md:text-sm text-[10px] md:font-semibold">{p.title}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="px-8 py-4 w-full mt-2">
          {activeTab == 1 && <CareerPath />}
          <div ref={bottomref} />
        </Card>
      </div>
    </>
  );
}
