import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
    DialogFooter,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Pencil } from "lucide-react";
  import { useState } from "react";
  import type { FloorData } from "../../../types/types";
  import { useMutation, useQueryClient } from "@tanstack/react-query";
  import { updateFloor } from "../../../apis/api";
  import { toast } from "sonner";
  
  interface EditFloorDialogProps {
    floor: FloorData;
  }
  
  const EditFloorDialog = ({ floor }: EditFloorDialogProps) => {
    const [open, setOpen] = useState(false);
    const [floorNumber, setFloorNumber] = useState(floor.floorNumber);
    const queryClient = useQueryClient();
  
    const { mutateAsync, isPending } = useMutation({
      mutationFn: updateFloor,
      onSuccess: () => {
        toast.success("Floor updated successfully");
        queryClient.invalidateQueries({ queryKey: ["floors"] });
        setOpen(false);
      },
    });
  
    const handleUpdate = async () => {
        await mutateAsync({ id: floor._id , floorNumber });
      };
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Pencil className="w-5 h-5 text-blue-600 cursor-pointer hover:scale-110 transition-transform" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Floor</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Input
              type="number"
              value={floorNumber}
              onChange={(e: { target: { value: any; }; }) => setFloorNumber(Number(e.target.value))}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={isPending}>
              {isPending ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default EditFloorDialog;
  