import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { forwardRef } from "react";

export interface DialogComponentProps {
  triggerLabel: string;
  children: React.ReactNode;
  dialogDetails: {
    title: string;
    description: string;
  };
}

export const DialogComponent = forwardRef<HTMLButtonElement, DialogComponentProps>(
  (
    {
      triggerLabel,
      children,
      dialogDetails,
    }: DialogComponentProps,
    ref
  ) => {
    const { title, description } = dialogDetails;

    return (
      <Dialog >
        <DialogTrigger asChild>
          <button className="bg-blue-500 p-1 rounded-sm text-white">{triggerLabel}</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <button ref={ref} type="button">Close</button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);

DialogComponent.displayName = "DialogComponent";
