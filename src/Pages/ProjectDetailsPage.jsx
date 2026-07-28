import ProjectOverview from "@/components/custom-components/project-comp/ProjectOverview";
import PractiseSkills from "@/components/custom-components/project-comp/PractiseSkills";
import ProjectTasks from "@/components/custom-components/project-comp/ProjectTasks";
import Resource from "@/components/custom-components/project-comp/Resource";
import SubmissionComponent from "@/components/custom-components/project-comp/SubmissionComp";
import React, { useMemo, useState } from "react";
import {
  Clock,
  Trophy,
  Sparkles,   
  LayoutDashboard,
  CheckSquare,
  BookOpen,
  Send,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useParams } from "react-router-dom";
import { useProjectDetail } from "@/Features/Projects/Project.query";
import { Badge } from "@/components/ui/badge";
import {useStartProject} from  "../Features/Projects/Project.mutation"
import {useRequireAuth} from "../hooks/use-require-auth"

const projectTabs = [
 

  {
    id: "tasks",
    label: "Tasks",
    icon: CheckSquare,
  },

  {
    id: "resources",
    label: "Resources",
    icon: BookOpen,
  },

  {
    id: "submission",
    label: "Submission",
    icon: Send,
  },
];

export default function ProjectDetailsPage() {
   const { id } = useParams();
  const { mutate, data, isLoading:isStarting } = useStartProject(id);

  const [activeTab, setActiveTab] = useState("tasks");
  const { data: project, isLoading } = useProjectDetail(id);
    if (isLoading)
      return (
        <div className="  flex  flex-col mt-25 items-center justify-center ">
          <img className="h-10 w-10" src="/loading1.gif" />
          <h1 className="font-semibold text-2xl mt-15">
            Loading Project Detail ......
          </h1>
        </div>
      );
  const {enforceAuth}=useRequireAuth()

  // console.log(project);

  const buttonContent =
    project.status && project.status === "submitted" ? " Project Submitted" : " Ptoject Started";
  // const project = projectApiResponse.data;
  const resources = project?.tasks.flatMap(task => task.resources)
  const handlerStartProject = (project) => {
mutate(project._id)
  }
  
  

  return (
    <div className="min-h-screen bg-white max-w-5xl  lg:max-w-6xl  mx-auto   rounded-md  p-2 ">
      <div className="max-w-5xl mx-auto lg:max-w-6xl ">
        {/* Header */}
        <Card className=" shadow-none  border-none rounded-none  bg-white">
          <CardContent className="px-6 ">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between  ">
              <div className="space-y-3 w-full">
                <h1 className="text-2xl font-bold text-foreground ">
                  {project.title}
                </h1>

                <p className="text-slate-600 max-w-3xl">
                  {project.description}
                </p>
                <div className="flex gap-9 ">
                  <p>
                    <span>Estimated Duration :</span> 🕒{" "}
                    {project.estimatedDuration.value}{" "}
                    {project.estimatedDuration.unit}
                  </p>
                  <div className="flex gap-4 ">
                    <div>
                      Difficulty :{" "}
                      <Badge className={`bg-orange-100 text-orange-700 p-2 `}>
                        {project.difficulty}
                      </Badge>
                    </div>
                    <div>
                      Level : {"  "}
                      <Badge className={`bg-green-100 text-green-700 p-2 `}>
                        {project.level}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end w-full ">
                  <Button
                    onClick={enforceAuth(() => handlerStartProject(project))}
                    className="w-1/3  rounded-md h-10  bg-foreground "
                  >
                    {project && project.status
                      ? buttonContent
                      : "▶ Start Project"}
                  </Button>
                </div>
              </div>

              {/* Progress */}
              <div className="w-full lg:w-[320px] space-y-3">
                <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                  {/* <span>Overall Progress</span> */}
                  {/* <span>{project.userProgress.progress}%</span> */}
                </div>

                {/* <Progress
                  className="*:bg-gray-300"
                  value={project.userProgress.progress}
                /> */}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-2   border  bg-white p-2 shadow-sm">
          {projectTabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center text-gray-500  gap-2 px-4 py-2 rounded-lg transition ${
                  activeTab === tab.id
                    ? "bg-slate-200  text-foreground"
                    : "hover:bg-slate-100"
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 ">
          <div className="lg:col-span-12 space-y-6 ">
            {/* {activeTab === "overview" && <ProjectOverview project={project} />} */}

            {activeTab === "tasks" && <ProjectTasks project={project} />}

            {activeTab === "resources" && <Resource resources={resources} />}

            {activeTab === "submission" && (
              <SubmissionComponent projectId={project._id} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
