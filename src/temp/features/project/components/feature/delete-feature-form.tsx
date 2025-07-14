"use client";

import { useActionState } from "react";
import { initialState } from "@/lib/server-actions/handleAction";
import AppForm from "@/lib/forms-inputs/form";
import { deleteFeature } from "../actions/featureActions";
import { useHandleFormState } from "@/lib/form-and-inputs/useHandleFormState";

export default function DeleteFeatureForm({ id }: { id: number }) {
  const [state, formAction, isPending] = useActionState(deleteFeature, initialState);

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
