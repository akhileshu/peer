import { AppCard } from "@/components/app/card";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "./button";

type EditableCardProps = {
  title: string;
  className?: string;
  editForm: React.ReactNode;
  renderComponent: React.ReactNode;
};

function useEditToggle(initial = false) {
  const [editing, setEditing] = useState(initial);
  const startEditing = () => setEditing(true);
  const cancelEditing = () => setEditing(false);
  return { editing, startEditing, cancelEditing };
}

export function EditableCard({
  title,
  className,
  editForm,
  renderComponent,
}: EditableCardProps) {
  const { editing, startEditing, cancelEditing } = useEditToggle();

  return (
    <AppCard
      title={title}
      className={cn(
        "space-y-2  border-t-0 border-l-0 border-r-0 border-b",
        className
      )}
    >
      {editing ? (
        <>
          {editForm}
          <Button disabled={!editing} onClick={cancelEditing}>
            Cancel
          </Button>
        </>
      ) : (
        <>
          <Button disabled={editing} onClick={startEditing}>
            Edit
          </Button>
          {renderComponent}
        </>
      )}
    </AppCard>
  );
}
