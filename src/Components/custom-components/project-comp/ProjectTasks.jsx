import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import React, { useMemo, useState } from "react";
import {
  PlayCircle,
  BookOpen,
  Code2,
  UploadCloud,
  Layers,
} from "lucide-react";



const getStatusBadge = (status) => {
  if (status === "completed")
    return (
      <Badge className="bg-green-600 text-white hover:bg-green-600">
        Completed
      </Badge>
    );

  if (status === "in_progress")
    return (
      <Badge className="bg-yellow-500 text-white hover:bg-yellow-500">
        In Progress
      </Badge>
    );

  if (status === "submitted")
    return (
      <Badge className="bg-blue-600 text-white hover:bg-blue-600">
        Submitted
      </Badge>
    );

  return (
    <Badge className="bg-gray-200 text-gray-800 hover:bg-gray-200">
      Not Started
    </Badge>
  );
}; 

const getTaskIcon = (type) => {
  if (type === "reading") return <BookOpen className="w-4 h-4" />;
  if (type === "video") return <PlayCircle className="w-4 h-4" />;
  if (type === "practice") return <Code2 className="w-4 h-4" />;
  if (type === "submission") return <UploadCloud className="w-4 h-4" />;
  return <Layers className="w-4 h-4" />;
};

export default function ProjectTasks({ project}) {

        const [activeTaskId, setActiveTaskId] = useState(
          project.tasks[0]._id,
        );
      
        const activeTask = useMemo(() => {
          return project.tasks.find((t) => t._id === activeTaskId);
        }, [activeTaskId, project.tasks]);
    
  let i = 1;
    return (
      <>
         <Card className=" border-none  bg-white md:max-w-5xl mx-auto max-w-4xl ">
                      <CardHeader>
                        <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
                          <Layers className="w-5 h-5 text-indigo-600" />
                          Tasks
                        </CardTitle>
                      </CardHeader>
        
                      <CardContent className="grid grid-cols-5 lg:grid-cols-12 w-full  mr-5 relative ">
                        <div className="flex w-full lg:col-span-12 col-span-5 gap-4 ">
                          <div className="bg-gray-200 w-px  min-h-full mt-15  mb-2"></div>
                          <div className="flex w-full  ">
        {/* Tasks List */}
        <div className="lg:col-span-12 w-full  space-y-3">
          {project.tasks.map((task) => (
            <div >
              <div className=" h-5 w-5  text-[12px]  border bg-foreground rounded-xl absolute left-2 mt-13  text-white text-center">
           
              </div>
              <div >
                <button
                  key={task._id}
                  onClick={() => setActiveTaskId(task._id)}
                  className={`w-full text-left rounded-xl border p-4 transition hover:shadow-sm ${
                    activeTaskId === task._id
                      ? "bg-indigo-50 border-indigo-300"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        {getTaskIcon(task.type)}
                        <span className="capitalize">{task.type}</span>
                        <span>•</span>
                        <span>
                          {task.estimatedTime.value} {task.estimatedTime.unit}
                        </span>
                      </div>

                      <h3 className="font-semibold text-slate-900">
                        {task.title}
                      </h3>
                    </div>

                    <div>{getStatusBadge(task.status)}</div>
                  </div>

                  <div className="pt-3 w-40  md:w-60 ">
                    <Progress
                      className=" *:bg-gray-300"
                      value={task.progress}
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      {task.progress}% completed
                    </p>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
    </div>
                </div>
              </CardContent>
            </Card>
        {/* Active Task Details */}
      </>
    );
}