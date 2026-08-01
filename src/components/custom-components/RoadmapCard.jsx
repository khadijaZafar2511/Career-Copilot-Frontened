import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
export default function RoadmapCard({ roadmap }) {
  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-md transition p-6 border border-blue-200 space-y-6 ">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <span className="text-2xl">{roadmap.icon}</span>
            {roadmap.title}
          </CardTitle>
          {/* <Badge variant="secondary">{roadmap.level}</Badge> */}
        </div>

        <p className="text-sm text-muted-foreground mt-2 ">
          {roadmap.description.length > 75
            ? roadmap.description.slice(0, 75)
            : roadmap.description}
          .....
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {roadmap.tags.map((tag, index) => (
            <Badge key={index} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Duration */}
        <p className="text-sm ">
          ⏳ Duration: <span className="font-medium">{roadmap.estimatedDuration}</span>
        </p>


        {/* Button */}
        <Link to={`/roadmap/${roadmap._id}`}>
          <Button className="p-5 w-full mt-4 cursor-pointer">View Roadmap</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
