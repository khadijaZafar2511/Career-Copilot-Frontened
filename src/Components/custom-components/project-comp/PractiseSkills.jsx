
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
export default function PractiseSkills({project}) {
  return (
    <div>
      <Card className="rounded-2xl border bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-slate-900">
            Skills You’ll Practice
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {project.skillsYouWillPractice.map((skill, idx) => (
            <Badge
              key={idx}
              className="bg-slate-100 text-slate-800 hover:bg-slate-100"
            >
              {skill}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
