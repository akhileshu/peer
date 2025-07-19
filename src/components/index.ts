import AppImg from "@/components/app/AppImg";
import { AppCard } from "@/components/app/card";
import { DialogComponent } from "@/components/app/dialog";
import SubmitButton, { Button } from "@/components/app/form-and-inputs/button";
import { EditableCard } from "@/components/app/form-and-inputs/editable-card";
import AppForm from "@/components/app/form-and-inputs/form";
import { Input } from "@/components/app/form-and-inputs/Input";
import { LabeledField } from "@/components/app/form-and-inputs/LabeledField";
import { MultiSelect } from "@/components/app/form-and-inputs/MultiSelect";
import { Select } from "@/components/app/form-and-inputs/Select";
import { HoverDropdown } from "@/components/app/hover-dropdown";
import { AppLink } from "@/components/app/link";
import TreeDropdownRoot from "@/components/app/TreeDropdown/TreeDropdown";

export const Components = {
  Image: AppImg,
  Card: AppCard,
  Dialog: DialogComponent,
  HoverDropdown: HoverDropdown,
  Link: AppLink,
  userInput: {
    Button: Button,
    SubmitButton: SubmitButton,
    EditableCard: EditableCard,
    Form: AppForm,
    LabeledField: LabeledField,
    MultiSelect: MultiSelect,
    Select: Select,
    Input: Input,
    TreeDropdownRoot,
  },
} as const;
