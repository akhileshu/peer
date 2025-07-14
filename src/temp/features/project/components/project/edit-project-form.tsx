"use client";

import { AppCard } from "@/components/app/card";
import { Button } from "@/lib/form-and-inputs/button";
import AppForm from "@/lib/form-and-inputs/form";
import { useHandleFormState } from "@/lib/form-and-inputs/useHandleFormState";
import { initialState } from "@/lib/server-actions/handleAction";
import { useActionState, useEffect } from "react";
import { projectActions } from "../../actions";

type EditProjectFormProps = {
  project: any;
  onCancel?: () => void;
};

export function EditProjectForm({ project, onCancel }: EditProjectFormProps) {
  const [state, formAction, isPending] = useActionState(
    projectActions.update,
    initialState
  );
  const { fieldErrors } = state ?? {};

  useHandleFormState({
    state,
    revalidatePath: "/placeholderPath",
  });

  useEffect(() => {
    if (state.ok && onCancel) {
      onCancel();
    }
  }, [onCancel, state.ok]);

  return (
    <AppCard title="Edit Project">
      <AppForm
        className="space-y-4 max-w-md"
        action={formAction}
        variant="default"
        submitVariant="default"
        submitProps={ {
          isPending,
          buttonState: { disabled: isPending },
          label: "Update Project",
        } }
      >
        <p>Edit form fields for project go here.</p>

        {onCancel && (
          <Button
            className="mr-2 text-red-600"
            disabled={isPending}
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
      </AppForm>
    </AppCard>
  );
}
