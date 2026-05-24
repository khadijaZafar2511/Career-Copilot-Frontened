import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardTitle } from "@/Components/ui/card";
import { Link } from "react-router-dom";
import {
    Bot,
  Milestone,
  Radar,
  WandSparkles,
  FileQuestion,
  LineChart,
} from "lucide-react";
export default function HomePage() {


    const cardContent = [
      {
        avator: Bot,
        title: "AI Career Mentor",
        content: "Get personalized guidance from your AI mentor",
      },
      {
        avator: Milestone,
        title: "Personalized Roadmaps",
        content: "Follow ustomizes roadmaps tailored to your goals",
      },
      {
        avator: Radar,
        title: "Skill Tracking System",
        content: "Track your skills , progress and improvement ",
      },
      {
        avator: WandSparkles,
        title: "Project Generator ",
        content: "Find unique project ideas and build your porfolio ",
      },
      {
        avator: FileQuestion,
        title: "Quiz & Assessment",
        content: "Test your knowledge and strengthen your concepts",
      },
      {
        avator: LineChart,
        title: "Progress Dashboard",
        content: "Visualize your journey and stay motivated",
      },
    ];



    return (
      <>
        <div className=" w-full min-h-screen flex flex-col items-center">
          <div className="font-semibold md:text-2xl text-xl flex flex-col ">
            <span className="text-gray-600 mt-4 flex gap-2 py-1 px-4   ">
              Your AI Career Copilot
            </span>
            <span className="text-blue-600 mb-3 md:text-3xl text-2xl ">
              For Tech Career Growth
            </span>
          </div>

          <p className="text-sm">
            Personalized roadmaps, AI mentor , project ideas , <br /> quizzes
            and skill tracking __ all in one platform
          </p>

          {/* buttons  */}
          <div className="flex gap-2 py-6 ">
            <Link to="/dashboard">
              <Button className="h-11 w-33">Start Learning</Button>
            </Link>
            <Link to="/roadmaps">
              <Button className="h-11 w-33 bg-blue-50 border border-blue-700 text-gray-700">
                View Roadmaps
              </Button>
            </Link>
          </div>

          {/* card area */}
          <div className="bg-gray-50  h-full w-full py-5 mt-7 px-8">
            <div className="md:text-2xl text-xl mb-6 font-semibold text-center">
              {" "}
              Everything You Need to Grow
            </div>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
              {cardContent.map((card) => {
                const Icon = card.avator;
                return (
                  <div key={card.title}>
                    <Card className="p-4 flex flex-row  ">
                      <div>
                        <div className="bg-blue-100 flex items-center justify-center rounded-lg h-11 w-11">
                          <Icon className="h-6 w-6 text-blue-600 rounded-lg" />
                        </div>
                      </div>

                      <div>
                        <CardTitle>{card.title}</CardTitle>
                        <CardContent className="text-[12px] p-1">
                          {card.content}
                        </CardContent>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
}
