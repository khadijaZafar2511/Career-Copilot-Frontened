import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export default function ResourceCard({ resource }) {
  return (
    <Card className="transition-all hover:shadow-md hover:-translate-y-1">
      <CardHeader>
        <CardTitle className="text-lg text-foreground font-bold">{resource.title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <p className="text-sm leading-6 text-muted-foreground">
          {resource.description}
        </p>

        <Button asChild className="w-full">
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer  "
            className="flex "
          >
            <div>Open Resource</div>
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
