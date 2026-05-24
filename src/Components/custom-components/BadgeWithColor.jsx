import { Badge } from "@/components/ui/badge";


const roadmapColors = {
  Frontend: "bg-blue-100 text-blue-700 border-blue-200",
  Backend: "bg-green-100 text-green-700 border-green-200",
  Fullstack: "bg-purple-100 text-purple-700 border-purple-200",
  DevOps: "bg-orange-100 text-orange-700 border-orange-200",
  "AI/ML": "bg-pink-100 text-pink-700 border-pink-200",
  Default: "bg-green-100 text-green-700 border-green-200",
};

export default function RoadmapBadge({ roadmap }) {
  const colorClass = roadmapColors[roadmap] || roadmapColors["Default"];

  return (
    <Badge className={`${colorClass} border px-3 py-3 rounded-full`}>
      {roadmap}
    </Badge>
  );
}
