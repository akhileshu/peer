"use client";

import { AppCard } from "@/components/app/card";
import { renderStatusMessage } from "@/components/app/renderStatusMessage";
import { cn } from "@/lib/utils";
import { templateActions } from "../../actions";

import { EditableCard } from "@/lib/form-and-inputs/editable-card";
import { EditTemplateForm } from "./edit-template-form";

type TemplateDetailViewProps = {
  className?: string;
  templateResult: Awaited<ReturnType<typeof templateActions.getById>>;
};

export function TemplateDetailView({
  templateResult,
  className,
}: TemplateDetailViewProps) {
  const cardTitle = "Template";

  const statusMessage = renderStatusMessage(templateResult, cardTitle);
  if (statusMessage || !templateResult.ok) return statusMessage;

  const { data } = templateResult;

  return (
    <AppCard title={cardTitle} className={cn("space-y-2", className)}>
      <EditableCard
        key={data.id}
        title="Template"
        className={className}
        editForm={<EditTemplateForm template={data} />}
        renderComponent={<RenderTemplate template={data} />}
      />
    </AppCard>
  );
}

type RenderTemplateProps = {
  template: unknown;
};

function RenderTemplate({ template }: RenderTemplateProps) {
  return <div>edit this component to display details of Template</div>;
}
