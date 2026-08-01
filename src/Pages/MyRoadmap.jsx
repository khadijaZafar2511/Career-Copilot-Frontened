import React, { memo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import { useMyRoadmaps } from "../Features/Roadmap/Roadmap.query";
import {
  useResumeRoadmap,
  usePauseRoadmap,
} from "@/Features/Roadmap/roadmap.mutation";

const getProgressColor = (status) => {
  switch (status) {
    case "completed":
      return "[&>div>div]:bg-green-600";
    case "paused":
      return "[&>div>div]:bg-orange-400";
    case "active":
      return "[&>div>div]:bg-blue-600";
    default:
      return "[&>div>div]:bg-red-500";
  }
};

const badgeStyles = {
  completed: "bg-green-50 text-green-700",
  paused: "bg-orange-50 text-orange-400",
  active: "bg-blue-50 text-blue-700",
};

const formatDate = (date) =>
  new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));

const Roadmap = memo(function Roadmap({ roadmap }) {
  const { mutate: resumeRoadmap, isPending: isResume } = useResumeRoadmap();
  const { mutate: pauseRoadmap, isPending: isPause } = usePauseRoadmap();

  const { _id, status, progress, updatedAt, currentMilestone, roadmapId } =
    roadmap;

  const { title, description, icon } = roadmapId;

  const pauseHandler = useCallback(() => {
    if (status === "active") {
      pauseRoadmap(_id);
    }
  }, [_id, status, pauseRoadmap]);

  const resumeHandler = useCallback(() => {
    if (status === "paused") {
      resumeRoadmap(_id);
    }
  }, [_id, status, resumeRoadmap]);

  return (
    <Card className="grid grid-cols-1 gap-1 space-y-6 rounded-2xl border border-blue-200 px-2 py-6 shadow-sm transition hover:shadow-md md:grid-cols-2 md:border-none md:px-4 lg:grid-cols-9">
      <CardHeader className="p-0 lg:col-span-4">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded bg-blue-50 p-3 text-3xl">{icon}</span>

          <CardTitle className="flex flex-col p-0 text-lg font-semibold">
            <div>
              <div className="w-full text-left text-xl text-foreground">
                {title}
              </div>

              <p className="text-sm text-muted-foreground">
                {description.length > 75
                  ? `${description.slice(0, 75)}...`
                  : description}
              </p>
            </div>
          </CardTitle>
        </div>

        <div className="mt-2 flex w-2/3 justify-center">
          <Badge className={`${badgeStyles[status]} px-8 py-3`}>{status}</Badge>
        </div>
      </CardHeader>

      <CardContent className="mb-0 space-y-4 lg:col-span-3">
        <div className="flex flex-col gap-2">
          <div className="font-semibold text-foreground">
            <div>Current Milestone:</div>

            <div className="text-xs text-gray-600">
              {currentMilestone?.title}
            </div>
          </div>

          <div className="flex text-md">
            <span>Progress:&nbsp;</span>
            <span className="font-semibold">{Math.round(progress ?? 0)}%</span>
          </div>

          <Progress
            value={progress ?? 0}
            className={`h-full w-full *:bg-gray-200 ${getProgressColor(status)}`}
          />
        </div>
      </CardContent>

      <div className="lg:col-span-2">
        {status === "active" && (
          <div className="flex w-full justify-center px-2 lg:justify-end">
            <Button
              onClick={pauseHandler}
              disabled={isPause}
              className="mt-4 w-5/6 cursor-pointer border-blue-600 bg-gray-50 p-5 text-foreground hover:bg-foreground hover:text-white"
            >
              {isPause ? "Pausing..." : "Pause ➜"}
            </Button>
          </div>
        )}

        {status === "paused" && (
          <div className="flex w-full justify-center px-2 lg:justify-end">
            <Button
              onClick={resumeHandler}
              disabled={isResume}
              className="mt-4 w-2/3 cursor-pointer border-orange-400 bg-white p-5 text-orange-400 hover:bg-orange-400 hover:text-white"
            >
              {isResume ? "Resuming..." : "Resume ➜"}
            </Button>
          </div>
        )}

        {status === "completed" && (
          <Link
            to={`/roadmap/${roadmapId._id}`}
            className="flex w-full justify-center px-2 lg:justify-end"
          >
            <Button className="mt-4 w-2/3 cursor-pointer border-green-600 bg-white p-5 text-green-600 hover:bg-green-600 hover:text-white">
              View Roadmap ➜
            </Button>
          </Link>
        )}

        <div className="mt-2 text-right text-xs text-gray-500">
          🕒 {formatDate(updatedAt)}
        </div>
      </div>
    </Card>
  );
});

export default function MyRoadmap() {
  const { data: roadmaps = [], isLoading } = useMyRoadmaps();

  if (isLoading) {
    return (
      <div className="mt-25 flex flex-col items-center justify-center">
        <img
          src="/loading1.gif"
          alt="Loading"
          width={40}
          height={40}
          loading="eager"
        />
      </div>
    );
  }

  if (roadmaps.length === 0) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        No roadmaps found.
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {roadmaps.map((roadmap) => (
        <div key={roadmap._id} className="px-3 py-2 md:px-5 lg:px-10">
          <Roadmap roadmap={roadmap} />
        </div>
      ))}
    </div>
  );
}
