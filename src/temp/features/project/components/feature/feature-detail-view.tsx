"use client";

import { AppCard } from "@/components/app/card";
import { renderStatusMessage } from "@/components/app/renderStatusMessage";
import { cn } from "@/lib/utils";
import { featureActions } from "../../actions";

import { EditableCard } from "@/lib/form-and-inputs/editable-card";
import { EditFeatureForm } from "./edit-feature-form";

type FeatureDetailViewProps = {
  className?: string;
  featureResult: Awaited<ReturnType<typeof featureActions.getById>>;
};

export function FeatureDetailView({
  featureResult,
  className,
}: FeatureDetailViewProps) {
  const cardTitle = "Feature";

  const statusMessage = renderStatusMessage(featureResult, cardTitle);
  if (statusMessage || !featureResult.ok) return statusMessage;

  const { data } = featureResult;

  return (
    <AppCard title={cardTitle} className={cn("space-y-2", className)}>
      <EditableCard
        key={data.id}
        title="Feature"
        className={className}
        editForm={<EditFeatureForm feature={data} />}
        renderComponent={<RenderFeature feature={data} />}
      />
    </AppCard>
  );
}

type RenderFeatureProps = {
  feature: unknown;
};

function RenderFeature({ feature }: RenderFeatureProps) {
  return <div>edit this component to display details of Feature</div>;
}
