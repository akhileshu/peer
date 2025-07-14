"use client";

import { AppCard } from "@/components/app/card";
import { renderStatusMessage } from "@/components/app/renderStatusMessage";
import { cn } from "@/lib/utils";
import { phaseActions } from "../../actions";

import { EditableCard } from "@/lib/form-and-inputs/editable-card";
import { EditPhaseForm } from "./edit-phase-form";

type PhaseDetailViewProps = {
  className?: string;
  phaseResult: Awaited<ReturnType<typeof phaseActions.getById>>;
};

export function PhaseDetailView({
  phaseResult,
  className,
}: PhaseDetailViewProps) {
  const cardTitle = "Phase";

  const statusMessage = renderStatusMessage(phaseResult, cardTitle);
  if (statusMessage || !phaseResult.ok) return statusMessage;

  const { data } = phaseResult;

  return (
    <AppCard title={cardTitle} className={cn("space-y-2", className)}>
      <EditableCard
        key={data.id}
        title="Phase"
        className={className}
        editForm={<EditPhaseForm phase={data} />}
        renderComponent={<RenderPhase phase={data} />}
      />
    </AppCard>
  );
}

type RenderPhaseProps = {
  phase: unknown;
};

function RenderPhase({ phase }: RenderPhaseProps) {
  return <div>edit this component to display details of Phase</div>;
}
