"use client";

import { AppCard } from "@/components/app/card";
import { renderStatusMessage } from "@/components/app/renderStatusMessage";
import { cn } from "@/lib/utils";
import { projectTimelineActions } from "../../actions";

import { EditableCard } from "@/lib/form-and-inputs/editable-card";
import { EditProjectTimelineForm } from "./edit-projectTimeline-form";

type ProjectTimelineDetailViewProps = {
  className?: string;
  projectTimelineResult: Awaited<
    ReturnType<typeof projectTimelineActions.getById>
  >;
};

export function ProjectTimelineDetailView({
  projectTimelineResult,
  className,
}: ProjectTimelineDetailViewProps) {
  const cardTitle = "ProjectTimeline";

  const statusMessage = renderStatusMessage(projectTimelineResult, cardTitle);
  if (statusMessage || !projectTimelineResult.ok) return statusMessage;

  const { data } = projectTimelineResult;

  return (
    <AppCard title={cardTitle} className={cn("space-y-2", className)}>
      <EditableCard
        key={data.id}
        title="ProjectTimeline"
        className={className}
        editForm={<EditProjectTimelineForm projectTimeline={data} />}
        renderComponent={<RenderProjectTimeline projectTimeline={data} />}
      />
    </AppCard>
  );
}

type RenderProjectTimelineProps = {
  projectTimeline: unknown;
};

function RenderProjectTimeline({
  projectTimeline,
}: RenderProjectTimelineProps) {
  return <div>edit this component to display details of ProjectTimeline</div>;
}
