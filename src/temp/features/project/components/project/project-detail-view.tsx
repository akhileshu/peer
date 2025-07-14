"use client";

import { AppCard } from "@/components/app/card";
import { renderStatusMessage } from "@/components/app/renderStatusMessage";
import { cn } from "@/lib/utils";
import { projectActions } from "../../actions";

import { EditableCard } from "@/lib/form-and-inputs/editable-card";
import { EditProjectForm } from "./edit-project-form";

type ProjectDetailViewProps = {
  className?: string;
  projectResult: Awaited<ReturnType<typeof projectActions.getById>>;
};

export function ProjectDetailView({
  projectResult,
  className,
}: ProjectDetailViewProps) {
  const cardTitle = "Project";

  const statusMessage = renderStatusMessage(projectResult, cardTitle);
  if (statusMessage || !projectResult.ok) return statusMessage;

  const { data } = projectResult;

  return (
    <AppCard title={cardTitle} className={cn("space-y-2", className)}>
      <EditableCard
        key={data.id}
        title="Project"
        className={className}
        editForm={<EditProjectForm project={data} />}
        renderComponent={<RenderProject project={data} />}
      />
    </AppCard>
  );
}

type RenderProjectProps = {
  project: unknown;
};

function RenderProject({ project }: RenderProjectProps) {
  return <div>edit this component to display details of Project</div>;
}
