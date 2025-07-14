"use client";

import { AppCard } from "@/components/app/card";
import { renderStatusMessage } from "@/components/app/renderStatusMessage";
import { cn } from "@/lib/utils";
import { projectTimelineActions } from "../../actions";
import Link from "next/link";
import { Button } from "@/lib/form-and-inputs/button";

type ProjectTimelineMinimalInfoProps = {
  projectTimeline: unknown;
};
function ProjectTimelineMinimalInfo({
  projectTimeline,
}: ProjectTimelineMinimalInfoProps) {
  return (
    <Link
      key={ProjectTimeline.id}
      href={`/projectTimelines/${ProjectTimeline.id}`}
    >
      <div className="p-4 border rounded hover:bg-gray-50 transition cursor-pointer space-y-1">
        update boilerplate here
      </div>
    </Link>
  );
}

type ProjectTimelineListViewProps = {
  className?: string;
  projectTimelinesResult: Awaited<
    ReturnType<typeof projectTimelineActions.getAll>
  >;
};
export function ProjectTimelineListView({
  projectTimelinesResult,
  className,
}: ProjectTimelineListViewProps) {
  const cardTitle = "ProjectTimeline List";

  const statusMessage = renderStatusMessage(projectTimelinesResult, cardTitle);
  if (statusMessage || !projectTimelinesResult.ok) return statusMessage;

  const { data } = projectTimelinesResult;

  return (
    <AppCard title={cardTitle} className={cn("space-y-4", className)}>
      <div>
        <Button className="" disabled={false} onClick={console.log}>
          create projectTimeline
        </Button>
        {data.map((item) => (
          <ProjectTimelineMinimalInfo key={item.id} projectTimeline={item} />
        ))}
      </div>
    </AppCard>
  );
}
