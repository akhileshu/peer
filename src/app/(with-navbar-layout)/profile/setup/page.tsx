"use client";
import { Components } from "@/components";
import { AppCard } from "@/components/app/card";

import { initialState } from "@/lib/server-actions/handleAction";
import { profile } from "@/services/profile";

import { useSession } from "next-auth/react";
import { useActionState, useEffect } from "react";

export default function SetupProfile() {
  const { update } = useSession();
  const [state, formAction, isPending] = useActionState(
    profile.actions.setupProfile,
    initialState
  );
  const { fieldErrors } = state;
  const {userInput:{LabeledField}}=Components

  Components.utils.useHandleFormState({
    state,
    revalidatePath: "/placeholderPath",
    navigateTo: "/api/auth/session",
  });

  useEffect(() => {
    const updateProfile = async () => {
      await update({ isProfileSetupDone: true });
    };
    if (state.ok) {
      updateProfile();
    }
  }, [state.ok, update]);

  return (
    <AppCard title="Setup Profile">
      <form
        action={formAction}
        className="space-y-4 p-4 max-w-lg flex flex-col"
      >
        <LabeledField label="Domain" name="domain" errors={fieldErrors?.domain}>
          <select name="domain" required>
            <option value="">Select Domain</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="DevOps">DevOps</option>
            <option value="Fullstack">Fullstack</option>
            <option value="Mobile">Mobile</option>
            <option value="Data">Data</option>
          </select>
        </LabeledField>

        <LabeledField label="Skills" name="skills" errors={fieldErrors?.skills}>
          <input
            name="skills"
            placeholder="Skills (comma separated)"
            value={"Node.js, Docker"}
          />
        </LabeledField>

        <LabeledField
          label="Interests"
          name="interests"
          errors={fieldErrors?.interests}
        >
          <input
            name="interests"
            placeholder="Interests (comma separated)"
            value={"System Design, AI"}
          />
        </LabeledField>

        <LabeledField
          label="Your Intent"
          name="intents"
          errors={fieldErrors?.intents}
          infoText="can choose multiple"
        >
          <div className="space-x-2">
            <label>
              <input type="checkbox" name="intents" value="Learn" /> Learn
            </label>
            <label>
              <input type="checkbox" name="intents" value="Collaborate" />{" "}
              Collaborate
            </label>
            <label>
              <input
                type="checkbox"
                name="intents"
                value="ContributeOrMentor"
              />{" "}
              Mentor / Contribute
            </label>
            <label>
              <input type="checkbox" name="intents" value="GetHelp" /> Get Help
            </label>
          </div>
        </LabeledField>

        <LabeledField
          label="Match Preferences"
          name="matchPreferences"
          errors={fieldErrors?.matchPreferences}
          infoText="can choose multiple"
        >
          <div className="space-x-2">
            <label>
              <input
                type="checkbox"
                name="matchPreferences"
                value="SimilarInterest"
              />{" "}
              Similar Interests
            </label>
            <label>
              <input
                type="checkbox"
                name="matchPreferences"
                value="SimilarLevel"
              />{" "}
              Similar Level
            </label>
            <label>
              <input
                type="checkbox"
                name="matchPreferences"
                value="SharedGoals"
              />{" "}
              Shared Goals
            </label>
          </div>
        </LabeledField>

        <div className="flex gap-5">
          <LabeledField
            label="Start Time"
            name="startTime"
            errors={fieldErrors?.startTime}
          >
            <input name="startTime" type="time" required />
          </LabeledField>
          <LabeledField
            label="End Time"
            name="endTime"
            errors={fieldErrors?.endTime}
          >
            <input name="endTime" type="time" required />
          </LabeledField>
        </div>

        <div className="flex gap-5">
          <LabeledField
            label="Preferred Days"
            name="preferredDays"
            errors={fieldErrors?.preferredDays}
          >
            <select className="w-28" size={7} name="preferredDays" multiple>
              <option value="Monday">Mon</option>
              <option value="Tuesday">Tue</option>
              <option value="Wednesday">Wed</option>
              <option value="Thursday">Thu</option>
              <option value="Friday">Fri</option>
              <option value="Saturday">Sat</option>
              <option value="Sunday">Sun</option>
            </select>
          </LabeledField>

          <LabeledField
            label="Prefer Weekends?"
            name="prefersWeekends"
            errors={fieldErrors?.prefersWeekends}
            isCheckbox
          >
            <input type="checkbox" name="prefersWeekends" />
          </LabeledField>
        </div>

        <button
          disabled={isPending}
          className="bg-blue-500 rounded-sm p-1 disabled:bg-gray-300"
          type="submit"
        >
          Save Profile
        </button>
      </form>
    </AppCard>
  );
}
