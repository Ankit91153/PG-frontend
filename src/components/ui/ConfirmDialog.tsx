import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
  } from "@/components/ui/alert-dialog";
  import { Button } from "@/components/ui/button";
  import { useState } from "react";
  import type { ReactNode } from "react";
  
  interface ConfirmDialogProps {
    trigger: ReactNode;
    title?: string;
    description?: string;
    onConfirm: () => Promise<void> | void;
    confirmText?: string;
    cancelText?: string;
  }
  
  const ConfirmDialog = ({
    trigger,
    title = "Are you sure?",
    description = "This action cannot be undone.",
    onConfirm,
    confirmText = "Confirm",
    cancelText = "Cancel",
  }: ConfirmDialogProps) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const handleConfirm = async () => {
      try {
        setLoading(true);
        await onConfirm();
        setOpen(false); // close dialog after confirm
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              {cancelText}
            </Button>
            <Button variant="destructive" onClick={handleConfirm} disabled={loading}>
              {loading ? "Deleting..." : confirmText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  
  export default ConfirmDialog;
  