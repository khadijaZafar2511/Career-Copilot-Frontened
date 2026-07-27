import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { BookOpen, ExternalLink } from "lucide-react";
export default function ProjectTaskDetail({ task, setIsTaskDetail }) {
  const backwardHandler = () => {
    setIsTaskDetail(false);
  };
  return (
    <>
      <Card className="p-4  gap-0 ">
        <CardTitle className="text-xl font-semibold flex md:justify-between  md:flex-row flex-col ">
          <div className="flex gap-3 ">
            <div onClick={backwardHandler} className="cursor-pointer w-fit ">
              ←
            </div>{" "}
            <span>{task.order} - {task.title}</span>
          </div>
        </CardTitle>
        <CardContent className="space-y-5 px-0  md:px-4  ">
          <div>{task.description}</div>
          <div className="flex gap-2 ">
            <Badge className="p-4  bg-gray-100 text-gray-600">
              🕒 {task.estimatedTime.value}
              {task.estimatedTime.unit}
            </Badge>

            <Badge className="p-4  bg-gray-100 text-gray-600">
              {task.type}
            </Badge>
          </div>
          <div className="flex flex-col gap-1 mt-3 ">
            <div className="text-lg font-medium  mb-1   ">
              Acceptance Criteria{" "}
            </div>
            {task.acceptanceCriteria.map((acc) => (
              <div className="flex gap-2 items-center ">
           
                <div> ☑️ {acc}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-1 mt-3 ">
            <div className="text-lg font-medium  mb-1   ">
              Learning Objectives{" "}
            </div>
            {task.learningObjectives.map((ler) => (
              <div className="flex gap-2 items-center ">
                
                <div> ☑️ {ler} </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1 p-3 border bg-gray-50 rounded-md ">
            <div className="text-blue-600 flex gap-2 font-semibold">
              <div class="w-fit inline-flex items-center justify-center bg-blue-100 p-2 rounded-full shadow-inner animate-pulse">
                <svg
                  class="w-6 h-6 fill-blue-500 text-blue-600 filter drop-shadow-[0_0_4px_rgba(59,130,246,0.8)]"
                  viewBox="0 0 24 24"
                  xmlns="http://w3.org"
                >
                  <path d="M12 2C7.58 2 4 5.58 4 10c0 2.76 1.4 5.19 3.5 6.62V19c0 1.1.9 2 2 2h5c1.1 0 2-.9 2-2v-2.38c2.1-1.43 3.5-3.86 3.5-6.62 0-4.42-3.58-8-8-8zm1.5 17h-3v-1h3v1zm1.5-2h-6v-1h6v1zm.14-2.61l-.64.44V16h-5v-.17l-.64-.44C7.8 14.3 7 12.21 7 10c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.21-.8 14.3-2.36 15.39z" />
                </svg>
              </div>
              <div className=" mt-1 text-base ">Hint </div>
            </div>
            <div>
              <div>
                {task.hints.map((hint) => (
                  <div>{hint}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1 p-3 border bg-yellow-50 rounded-md ">
            <div className="text-yellow-600 flex gap-2 font-semibold">
              <div className=" mt-1 text-base "> 🏆 Challenge </div>
            </div>
            <div>{task.challenge}</div>
          </div>
          <div>
            <div className="text-xl font-semibold mb-1 ">Resources</div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2  grid-cols-1 gap-3 ">
              {task.resources.map((res) => (
                <div className="border bg-gray-50 rounded  p-2  space-y-2 ">
                  <div className="text-md font-semibold  flex justify-between">
                    <span> {res.title}</span>
                    <a href={res.url} target="_blank" rel="noreferrer">
                      <Button className="bg-gray-200 text-black ">
                        Open
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                  <Badge className="p-3   bg-gray-100 text-gray-600 text-sm   ">
                    {res.type}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full justify-end">
            <Button className="p-4  ">Mark as Complete</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}