"use client";

import { AppCard } from "@/components/app/card";
import { renderStatusMessage } from "@/components/app/renderStatusMessage";
import { cn } from "@/lib/utils";
import { projectActions } from "../../actions";
import Link from "next/link";
import { Button } from "@/lib/form-and-inputs/button";

type ProjectMinimalInfoProps = {
  project: unknown;
};
function ProjectMinimalInfo({ project }: ProjectMinimalInfoProps) {
  return (
    <Link key={Project.id} href={`/projects/${Project.id}`}>
      <div className="p-4 border rounded hover:bg-gray-50 transition cursor-pointer space-y-1">
        update boilerplate here
      </div>
    </Link>
  );
}

type ProjectListViewProps = {
  className?: string;
  projectsResult: Awaited<ReturnType<typeof projectActions.getAll>>;
};
export function ProjectListView({
  projectsResult,
  className,
}: ProjectListViewProps) {
  const cardTitle = "Project List";

  const statusMessage = renderStatusMessage(projectsResult, cardTitle);
  if (statusMessage || !projectsResult.ok) return statusMessage;

  const { data } = projectsResult;

  return (
    <AppCard title={cardTitle} className={cn("space-y-4", className)}>
      <div>
        <Button className="" disabled={false} onClick={console.log}>
          create project
        </Button>
        {data.map((item) => (
          <ProjectMinimalInfo key={item.id} project={item} />
        ))}
      </div>
    </AppCard>
  );
}
