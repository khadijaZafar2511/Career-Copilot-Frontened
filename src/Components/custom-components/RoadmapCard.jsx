import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Progress } from "@/Components/ui/progress";
import { Button } from "@/Components/ui/button";
import {Link} from "react-router-dom";
export default function RoadmapCard({ roadmap }) {
  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-md transition p-7  space-y-6 ">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <span className="text-2xl">{roadmap.icon}</span>
            {roadmap.title}
          </CardTitle>
          {/* <Badge variant="secondary">{roadmap.level}</Badge> */}
        </div>

        <p className="text-sm text-muted-foreground mt-2">
          {roadmap.description}
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
          ⏳ Duration: <span className="font-medium">{roadmap.duration}</span>
        </p>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">{roadmap.progress}%</span>
          </div>
          <Progress value={roadmap.progress} />
        </div>

        {/* Learners */}
        {/* <p className="text-sm text-muted-foreground">
          👥 {roadmap.learners} learners enrolled
        </p> */}

        {/* Button */}
              <Link to={`/roadmaps/${roadmap.slug}`}>
          <Button className="p-5 w-full mt-4">View Roadmap</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
