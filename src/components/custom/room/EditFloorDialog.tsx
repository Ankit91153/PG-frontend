import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { useState, type SetStateAction } from "react";
import type { FloorData, RoomData } from "../../../types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRoom } from "../../../apis/api";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

interface EditRoomDialogProps {
  room: RoomData;
}

const EditRoomDialog = ({ room }: EditRoomDialogProps) => {
  const [open, setOpen] = useState(false);
  const [roomNumber, setRoomNumber] = useState(room.roomNumber);
  const [type, setType] = useState<"1-sharing" | "2-sharing" | "3-sharing">(
    room.type
  );
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateRoom,
    onSuccess: () => {
      toast.success("Room updated successfully");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      setOpen(false);
    },
  });

  const handleUpdate = async () => {
    await mutateAsync({ id: room._id, roomNumber, type });
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
          <Label htmlFor="roomNumber">Room Number</Label>
          <Input
            id="roomNumber"
            type="text"
            value={roomNumber}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setRoomNumber(e.target.value)
            }
            placeholder="e.g. 101"
          />

<Label>Room Type</Label>
            <Select value={type} onValueChange={(val:string) => setType(val as any)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-sharing">1-sharing</SelectItem>
                <SelectItem value="2-sharing">2-sharing</SelectItem>
                <SelectItem value="3-sharing">3-sharing</SelectItem>
              </SelectContent>
            </Select>
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

export default EditRoomDialog;
