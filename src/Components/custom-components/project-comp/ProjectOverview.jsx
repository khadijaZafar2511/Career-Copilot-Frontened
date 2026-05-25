import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Circle, Target, BadgeCheck } from "lucide-react";

export default function ProjectOverview({ project }) {
  return (
    <div className="lg:col-span-8 space-y-6">
      <Card className="rounded-none border bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600 " />
            Project Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-700 leading-relaxed">
            {project.description}
          </p>

          <Separator />

          <Tabs defaultValue="goals">
            <TabsList className="grid grid-cols-3 bg-slate-100 rounded-xl">
              <TabsTrigger value="goals">Goals</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
            </TabsList>

            <TabsContent value="goals" className="pt-4">
              <ul className="space-y-2">
                {project.learningGoals.map((goal, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-slate-700"
                  >
                    <BadgeCheck className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="requirements" className="pt-4">
              <ul className="space-y-2">
                {project.requirements.map((req, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-slate-700"
                  >
                    <Circle className="w-5 h-5 text-slate-500 mt-1" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="deliverables" className="pt-4">
              <ul className="space-y-2">
                {project.deliverables.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-slate-700"
                  >
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Task Viewer */}
    </div>
  );
}
