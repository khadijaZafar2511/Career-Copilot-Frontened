



import { useState } from "react";
import ResourceCard from "./ResourceCard";

import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ResourceSection({
  title,
  subtitle,
  icon,
  resources,
  buttonText,
}) {
  const [showAll, setShowAll] = useState(false);

  const displayedResources = showAll
    ? resources
    : resources.slice(0, 3);

  return (
    <section className="space-y-6">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div className="flex gap-4">

          <div className="mt-1 ">
            {icon}
          </div>

          <div>

            <h2 className="text-2xl font-semibold">
              {title}
            </h2>

            <p className="text-muted-foreground mt-1">
              {subtitle}
            </p>

          </div>

        </div>

        <span className="rounded-full bg-blue-50 text-foreground  px-3 py-1 text-sm font-medium">
          {resources.length} Resources
        </span>

      </div>

      {/* Resources */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

        {displayedResources.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            buttonText={buttonText}
          />
        ))}

      </div>

      {/* View More */}

      {resources.length > 2 && (
        <div className="flex justify-center">

          <Button
            variant="outline"
                      onClick={() => setShowAll(!showAll)}
                      className="bg-blue-50 text-foreground"
          >
            {showAll ? (
              <>
                View Less
                <ChevronUp className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                View More ({resources.length - 2})
                <ChevronDown className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

        </div>
      )}

    </section>
  );
}