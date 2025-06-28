import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { addBed, getAllRooms } from "../../../apis/api";

const bedOptionsMap: Record<string, string[]> = {
  "1-sharing": ["b1"],
  "2-sharing": ["b1", "b2"],
  "3-sharing": ["b1", "b2", "b3"],
};

const AddBed = () => {
  const [roomId, setRoomId] = useState("");
  const [roomType, setRoomType] = useState("");
  const [bedNumber, setBedNumber] = useState("");

  const { data: roomData } = useQuery({
    queryKey: ["rooms"],
    queryFn: getAllRooms,
  });

  useEffect(() => {
    if (!roomId) return;
    const selectedRoom = roomData?.success && roomData?.data?.find((room: any) => room._id === roomId);
    if (selectedRoom) setRoomType(selectedRoom.type);
  }, [roomId, roomData]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addBed,
    onSuccess: () => {
      toast.success("Bed added successfully");
      setRoomId("");
      setRoomType("");
      setBedNumber("");
    },
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!bedNumber || !roomId) return toast.error("All fields are required");
    await mutateAsync({ bedNumber, roomId, status: "available" });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add Bed</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {/* Room Select */}
          <div className="w-full">
            <Label>Select Room</Label>
            <Select value={roomId} onValueChange={setRoomId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose room" />
              </SelectTrigger>
              <SelectContent>
                {roomData?.success &&
                  roomData?.data?.map((room: any) => (
                    <SelectItem key={room._id} value={room._id}>
                      Room {room.roomNumber}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Bed Select */}
          <div className="w-full">
            <Label>Select Bed</Label>
            <Select value={bedNumber} onValueChange={setBedNumber} disabled={!roomType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose bed" />
              </SelectTrigger>
              <SelectContent>
                {bedOptionsMap[roomType]?.map((bed) => (
                  <SelectItem key={bed} value={bed}>
                    {bed.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <div className="flex items-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Adding..." : "Add Bed"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddBed;
