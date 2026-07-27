import {Card, CardContent } from "@/components/ui/card"

import { Globe, BookOpen } from "lucide-react";

import ResourceSection from "@/components/custom-components/ResourceSection";

import { websites, documentations, youtube } from "@/Data/resources";

export default function ResourcePage() {
  return (
    <div className="space-y-5 md:px-10 px-2 ">
      {/* Page Header */}

      <div className="space-y-2 bg-gray-50 p-6 flex flex-col items-center mb-3">
        <h1 className="md:text-3xl text-xl font-bold tracking-tight text-blue-500">
          Learning Resources
        </h1>

        <p className="max-w-3xl text-foreground leading-7 ">
          Carefully selected resources to help you master every topic in this
          milestone. Explore interactive websites, official documentation, and
          high-quality video tutorials.
        </p>
      </div>

      {/* Websites */}

      <Card className="bg-gray-50">
        <CardContent className="p-6  ">
          <ResourceSection
            title="Websites"
            subtitle="Interactive websites with tutorials, examples and hands-on learning."
            icon={<Globe className="h-6 w-6 text-blue-500" />}
            buttonText="Visit Website"
            resources={websites}
          />
        </CardContent>
      </Card>

      {/* Documentation */}

      <Card className="bg-gray-50">
        <CardContent className="p-6">
          <ResourceSection
            title="Documentation"
            subtitle="Official references and guides maintained by the technology creators."
            icon={<BookOpen className="h-6 w-6 text-green-500" />}
            buttonText="Read Documentation"
            resources={documentations}
          />
        </CardContent>
      </Card>

      {/* YouTube */}

      <Card className="bg-gray-50">
        <CardContent className="p-6">
          <ResourceSection
            title="Video Tutorials"
            subtitle="Watch step-by-step video lessons from trusted educators."
            // icon={<Youtube className="h-6 w-6 text-red-500" />}
            buttonText="Watch Video"
            resources={youtube}
          />
        </CardContent>
      </Card>
    </div>
  );
}

