"use client";

import { useActionState } from "react";
import { initialState } from "@/lib/server-actions/handleAction";
import AppForm from "@/lib/forms-inputs/form";
import { deleteProjectTimeline } from "../actions/projectTimelineActions";
import { useHandleFormState } from "@/lib/form-and-inputs/useHandleFormState";

export default function DeleteProjectTimelineForm({ id }: { id: number }) {
  const [state, formAction, isPending] = useActionState(deleteProjectTimeline, initialState);

  useHandleFormState({
    state,
    revalidatePath: "/dashboard",
  });

  return (
    <AppForm
      action={formAction}
      variant="delete"
      confirmation={ {
        message: "Are you sure you want to delete?",
        enabled: true,
      } }
      submitVariant="default"
      submitProps={ {
        isPending,
        buttonState: { disabled: isPending },
        label: "Delete",
      } }
    >
      <input type="hidden" name="id" value={id} />
    </AppForm>
  );
}
