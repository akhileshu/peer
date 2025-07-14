"use client";

import { AppCard } from "@/components/app/card";
import { renderStatusMessage } from "@/components/app/renderStatusMessage";
import { cn } from "@/lib/utils";
import { phaseActions } from "../../actions";
import Link from "next/link";
import { Button } from "@/lib/form-and-inputs/button";

type PhaseMinimalInfoProps = {
  phase: unknown;
};
function PhaseMinimalInfo({ phase }: PhaseMinimalInfoProps) {
  return (
    <Link key={Phase.id} href={`/phases/${Phase.id}`}>
      <div className="p-4 border rounded hover:bg-gray-50 transition cursor-pointer space-y-1">
        update boilerplate here
      </div>
    </Link>
  );
}

type PhaseListViewProps = {
  className?: string;
  phasesResult: Awaited<ReturnType<typeof phaseActions.getAll>>;
};
export function PhaseListView({ phasesResult, className }: PhaseListViewProps) {
  const cardTitle = "Phase List";

  const statusMessage = renderStatusMessage(phasesResult, cardTitle);
  if (statusMessage || !phasesResult.ok) return statusMessage;

  const { data } = phasesResult;

  return (
    <AppCard title={cardTitle} className={cn("space-y-4", className)}>
      <div>
        <Button className="" disabled={false} onClick={console.log}>
          create phase
        </Button>
        {data.map((item) => (
          <PhaseMinimalInfo key={item.id} phase={item} />
        ))}
      </div>
    </AppCard>
  );
}
