"use client";

import { AppCard } from "@/components/app/card";
import { renderStatusMessage } from "@/components/app/renderStatusMessage";
import { cn } from "@/lib/utils";
import { sampleProjectActions } from "../../actions";
import Link from "next/link";
import { Button } from "@/lib/form-and-inputs/button";

type SampleProjectMinimalInfoProps = {
  sampleProject: unknown;
};
function SampleProjectMinimalInfo({
  sampleProject,
}: SampleProjectMinimalInfoProps) {
  return (
    <Link key={SampleProject.id} href={`/sampleProjects/${SampleProject.id}`}>
      <div className="p-4 border rounded hover:bg-gray-50 transition cursor-pointer space-y-1">
        update boilerplate here
      </div>
    </Link>
  );
}

type SampleProjectListViewProps = {
  className?: string;
  sampleProjectsResult: Awaited<ReturnType<typeof sampleProjectActions.getAll>>;
};
export function SampleProjectListView({
  sampleProjectsResult,
  className,
}: SampleProjectListViewProps) {
  const cardTitle = "SampleProject List";

  const statusMessage = renderStatusMessage(sampleProjectsResult, cardTitle);
  if (statusMessage || !sampleProjectsResult.ok) return statusMessage;

  const { data } = sampleProjectsResult;

  return (
    <AppCard title={cardTitle} className={cn("space-y-4", className)}>
      <div>
        <Button className="" disabled={false} onClick={console.log}>
          create sampleProject
        </Button>
        {data.map((item) => (
          <SampleProjectMinimalInfo key={item.id} sampleProject={item} />
        ))}
      </div>
    </AppCard>
  );
}
