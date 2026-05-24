import { useState } from "react";
import { projectsData } from "../Data/projectdata";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { Card } from "@/Components/ui/card";
import { Link } from "react-router-dom";
import RoadmapBadge from "@/Components/custom-components/BadgeWithColor"
export default function ProjectPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Frontend", "Backend", "Full Stack", "AI", "DevOps"];

  const filteredProjects = projectsData.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      activeFilter === "All" || p.roadmap.includes(activeFilter);

    return matchSearch && matchFilter;
  });

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen lg:max-w-6xl md:max-w-5xl max-w-4xl mx-auto">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-gray-500">Explore and build real-world projects</p>
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
        {filteredProjects.map((project) => (
          <Card
            key={project.id}
            className="overflow-hidden rounded-md shadow-sm hover:shadow-lg transition p-0"
          >
            {/* THUMBNAIL */}
            <div className="h-40 overflow-hidden">
              <img
                src={project.thumbnail}
                className="w-full h-full object-cover"
              />
            </div>

            {/* CONTENT */}
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <h2 className="font-semibold text-lg">{project.title}</h2>

                <RoadmapBadge roadmap={project.roadmap} />
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

              {/* PROGRESS */}
              <div className="w-full mt-5  bg-gray-200 h-1 rounded-full">
                <div
                  className="h-1 bg-blue-500 rounded-full"
                  style={{ width: `${project.progress}%` }}
                />
              </div>

              {/* ACTIONS */}
              <div className="flex justify-between pt-2">
                <Link to={`/projects/${project.title}`}>
                  <Button className="px-17  py-5"> View</Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
