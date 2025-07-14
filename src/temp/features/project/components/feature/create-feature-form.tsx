"use client";

import { AppCard } from "@/components/app/card";
import { useActionState } from "react";
import { initialState } from "@/lib/server-actions/handleAction";
import AppForm from "@/lib/forms-inputs/form";
import { useHandleFormState } from "@/lib/form-and-inputs/useHandleFormState";

export function CreateFeatureForm() {
  const [state, formAction, isPending] = useActionState(placeholderCreateAction, initialState);

  useHandleFormState({
    state,
    revalidatePath: "/placeholderPath",
  });

  return (
    <AppCard title="Create Feature">
      <AppForm
        className="space-y-4 max-w-md"
        action={formAction}
        variant="default"
        submitVariant="default"
        submitProps={ {
          isPending,
          buttonState: { disabled: isPending },
          label: "Create Feature",
        } }
      >
        <p>Creation form fields go here.</p>
      </AppForm>
    </AppCard>
  );
}