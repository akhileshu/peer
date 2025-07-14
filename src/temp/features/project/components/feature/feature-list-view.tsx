"use client";

import { AppCard } from "@/components/app/card";
import { renderStatusMessage } from "@/components/app/renderStatusMessage";
import { cn } from "@/lib/utils";
import { featureActions } from "../../actions";
import Link from "next/link";
import { Button } from "@/lib/form-and-inputs/button";

type FeatureMinimalInfoProps = {
  feature: unknown;
};
function FeatureMinimalInfo({ feature }: FeatureMinimalInfoProps) {
  return (
    <Link key={Feature.id} href={`/features/${Feature.id}`}>
      <div className="p-4 border rounded hover:bg-gray-50 transition cursor-pointer space-y-1">
        update boilerplate here
      </div>
    </Link>
  );
}

type FeatureListViewProps = {
  className?: string;
  featuresResult: Awaited<ReturnType<typeof featureActions.getAll>>;
};
export function FeatureListView({
  featuresResult,
  className,
}: FeatureListViewProps) {
  const cardTitle = "Feature List";

  const statusMessage = renderStatusMessage(featuresResult, cardTitle);
  if (statusMessage || !featuresResult.ok) return statusMessage;

  const { data } = featuresResult;

  return (
    <AppCard title={cardTitle} className={cn("space-y-4", className)}>
      <div>
        <Button className="" disabled={false} onClick={console.log}>
          create feature
        </Button>
        {data.map((item) => (
          <FeatureMinimalInfo key={item.id} feature={item} />
        ))}
      </div>
    </AppCard>
  );
}
