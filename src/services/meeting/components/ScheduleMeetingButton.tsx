"use client";

import { DialogComponent } from "@/components/app/dialog";
import { initialState } from "@/lib/server-actions/handleAction";
import { useActionState, useEffect, useRef } from "react";

import { Components } from "@/components";
import { lib } from "@/lib";
import { meeting } from "@/services/meeting";

export function ScheduleMeetingDialog({ userEmail }: { userEmail: string }) {
  const [state, formAction, isPending] = useActionState(
    meeting.actions.scheduleMeeting,
    initialState
  );
  const dialogCloseButtonRef = useRef<HTMLButtonElement>(null);
  lib.ui.useHandleFormState({
    state,
  });
  useEffect(() => {
    if (state.ok && dialogCloseButtonRef.current) {
      dialogCloseButtonRef.current.click();
    }
  }, [state]);

  const { fieldErrors } = state;
  const {userInput:{LabeledField,SubmitButton}}=Components

  return (
    <DialogComponent
      ref={dialogCloseButtonRef}
      triggerLabel="Schedule Meeting"
      dialogDetails={{
        title: "Schedule 1:1 Meeting",
        description: "Fill in the meeting details below",
      }}
    >
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="inviteeEmail" value={userEmail} />

        <LabeledField
          name="summary"
          label="Meeting Title"
          errors={fieldErrors?.summary}
        >
          <input
            name="summary"
            id="summary"
            required
            className="border px-2 py-1 rounded w-full"
            placeholder="e.g. Pair Programming Session"
          />
        </LabeledField>

        <LabeledField
          name="description"
          label="Description"
          errors={fieldErrors?.description}
        >
          <textarea
            name="description"
            id="description"
            className="border px-2 py-1 rounded w-full"
            placeholder="Optional"
          />
        </LabeledField>

        <LabeledField
          name="startTime"
          label="Start Time"
          errors={fieldErrors?.startTime}
        >
          <input
            type="datetime-local"
            name="startTime"
            id="startTime"
            required
            className="border px-2 py-1 rounded w-full"
          />
        </LabeledField>

        <LabeledField
          name="endTime"
          label="End Time"
          errors={fieldErrors?.endTime}
        >
          <input
            type="datetime-local"
            name="endTime"
            id="endTime"
            required
            className="border px-2 py-1 rounded w-full"
          />
        </LabeledField>

        <SubmitButton disabled={isPending} isPending={isPending} />
      </form>
    </DialogComponent>
  );
}
