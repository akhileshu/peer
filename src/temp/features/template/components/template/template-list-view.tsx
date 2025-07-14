"use client";

import { AppCard } from "@/components/app/card";
import { renderStatusMessage } from "@/components/app/renderStatusMessage";
import { cn } from "@/lib/utils";
import { templateActions } from "../../actions";
import Link from "next/link";
import { Button } from "@/lib/form-and-inputs/button";

type TemplateMinimalInfoProps = {
  template: unknown;
};
function TemplateMinimalInfo({ template }: TemplateMinimalInfoProps) {
  return (
    <Link key={Template.id} href={`/templates/${Template.id}`}>
      <div className="p-4 border rounded hover:bg-gray-50 transition cursor-pointer space-y-1">
        update boilerplate here
      </div>
    </Link>
  );
}

type TemplateListViewProps = {
  className?: string;
  templatesResult: Awaited<ReturnType<typeof templateActions.getAll>>;
};
export function TemplateListView({
  templatesResult,
  className,
}: TemplateListViewProps) {
  const cardTitle = "Template List";

  const statusMessage = renderStatusMessage(templatesResult, cardTitle);
  if (statusMessage || !templatesResult.ok) return statusMessage;

  const { data } = templatesResult;

  return (
    <AppCard title={cardTitle} className={cn("space-y-4", className)}>
      <div>
        <Button className="" disabled={false} onClick={console.log}>
          create template
        </Button>
        {data.map((item) => (
          <TemplateMinimalInfo key={item.id} template={item} />
        ))}
      </div>
    </AppCard>
  );
}
