import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import {
  BookOpen,
  ExternalLink,
} from "lucide-react";

export default function Resource({project}) {
  return (
    <>
      <Card className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
        {/* Header */}
        <div className="relative overflow-hidden border-b bg-foreground px-6 py-6 sm:px-8">
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400">
                Learning Materials
              </p>
              <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                Project Resources
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <CardContent className="space-y-3 bg-slate-50 p-4 sm:p-6">
          {project.resources.map((res) => (
            <div
              key={res._id}
              className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-md"
            >
              {/* LEFT SIDE */}
              <div className="flex items-center gap-4">
                {/* ICON (replaces thumbnail) */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border bg-slate-50">
                  <img
                    src={res.iconUrl}
                    alt={res.platform}
                    className="h-6 w-6 object-contain"
                  />
                </div>

                {/* TEXT */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {res.title}
                  </h3>

                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="rounded-md bg-slate-100 px-2 py-0.5">
                      {res.platform}
                    </span>

                    <span>•</span>

                    <span className="capitalize">{res.type}</span>

                    {res.isFree && (
                      <>
                        <span>•</span>
                        <span className="text-emerald-600 font-medium">
                          Free
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <a href={res.url} target="_blank" rel="noreferrer">
                <Button className="bg-gray-300 text-black ">
                  Open
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
