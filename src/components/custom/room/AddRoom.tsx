import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useState, type SetStateAction } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFloors, addRoomToFloor } from "../../../apis/api";
import { toast } from "sonner";
import type { FloorData } from "../../../types/types";

const AddRoom = () => {
  const [floorId, setFloorId] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [type, setType] = useState<"1-sharing" | "2-sharing" | "3-sharing">(
    "1-sharing"
  );

  const queryClient = useQueryClient();

  // fetch available floors
  const { data, isLoading } = useQuery({
    queryKey: ["floors"],
    queryFn: getFloors,
  });

  const floorData = data?.success ? data?.data : null;

  // mutation to add room
  const { mutateAsync, isPending } = useMutation({
    mutationFn: addRoomToFloor,
    onSuccess: () => {
      toast.success("Room added successfully");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      setFloorId("");
      setRoomNumber("");
      setType("1-sharing");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!floorId || !roomNumber || !type) {
      toast.error("All fields are required");
      return;
    }

    await mutateAsync({ floorId, roomNumber, type });
  };

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle>Add Room</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* Floor Dropdown */}
          <div className="w-full">
            <Label>Select Floor</Label>
            <Select value={floorId} onValueChange={setFloorId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose floor" />
              </SelectTrigger>
              <SelectContent>
                {floorData?.map((floor: FloorData) => (
                  <SelectItem key={floor._id} value={floor._id}>
                    Floor {floor.floorNumber}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Room Number Input */}
          <div className="w-full">
            <Label htmlFor="roomNumber">Room Number</Label>
            <Input
              id="roomNumber"
              type="text"
              value={roomNumber}
              onChange={(e: { target: { value: SetStateAction<string>; }; }) => setRoomNumber(e.target.value)}
              placeholder="e.g. 101"
            />
          </div>

          {/* Room Type Dropdown */}
          <div className="w-full">
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

          {/* Submit */}
          <div className="flex items-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Adding..." : "Add Room"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddRoom;
