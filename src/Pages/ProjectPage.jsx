import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Link ,useParams} from "react-router-dom";
import { useAllProject } from "../Features/Projects/Project.query";
import RoadmapBadge from "@/components/custom-components/BadgeWithColor";
export default function ProjectPage() {
  // const {id}=useParams()
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const { data: projectsData, isLoading } = useAllProject();
    if (isLoading)
      return (
        <div className="  flex  flex-col mt-25 items-center justify-center ">
          <img className="h-10 w-10" src="/loading1.gif" />
          <h1 className="font-semibold text-2xl mt-15">
            Loading Projects ......
          </h1>
        </div>
      );
// console.log(projectsData);
  const filters = ["All", "Frontend", "Backend", "Full Stack", "AI", "DevOps"];

  const filteredProjects =(projectsData.length>0) ? projectsData.filter((p) => {
    const matchSearch = p.roadmapId.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchFilter =
      activeFilter === "All" ||
      p.roadmapId.title.toLowerCase().includes(activeFilter.toLowerCase());;

    return matchSearch && matchFilter;
  }):[];


  
  return (
    <>
      <div className="md:px-5  px-2 ">
        <div className=" space-y-6 bg-gray-50 min-h-screen md:px-5 lg:px-10  px-2   ">
          {/* HEADER */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Projects</h1>
              <p className="text-gray-500">
                Explore and build real-world projects
              </p>
            </div>

            {/* <Button>+ Create Project</Button> */}
          </div>

          {/* SEARCH + FILTERS */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
            <Input
              placeholder="Search projects..."
              className="max-w-sm outine-none  "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="flex gap-2 flex-wrap">
              {filters.map((f) => (
                <Button
                  key={f}
                  variant={activeFilter === f ? "default" : "outline"}
                  onClick={() => setActiveFilter(f)}
                  className="rounded-full"
                >
                  {f}
                </Button>
              ))}
            </div>
          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {(filteredProjects.length>0)?filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="border border-blue-200 overflow-hidden rounded-md shadow-sm hover:shadow-lg transition p-0"
              >
               

                {/* CONTENT */}
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h2 className="font-semibold text-lg">{project.title}</h2>

                    <RoadmapBadge roadmap={project.roadmapId.title} />
                  </div>

                  <p className="text-sm text-gray-500">{project.description}</p>

                  {/* TAGS */}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((t) => (
                      <Badge
                        key={t}
                        className="bg-blue-50 text-foreground border border-gray-200 p-2 font-semibold"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>

                 

                  {/* ACTIONS */}
                  <div className="flex justify-between pt-2">
                    <Link to={`/projects/${project.roadmapId._id}/detail`}>
                      <Button className="px-17  py-5"> View</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            )) : (
                <div>No project has found </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
