import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllRooms, deleteFloor, deleteRoom } from "../../../apis/api";
import { Pencil, Trash } from "lucide-react";
//   import ConfirmDialog from "@/components/custom/common/ConfirmDialog";
import type { FloorData, RoomData } from "../../../types/types";
import ConfirmDialog from "../../ui/ConfirmDialog";
import { toast } from "sonner";
import EditFloorDialog from "./EditFloorDialog";
import EditRoomDialog from "./EditFloorDialog";
// import EditFloorDialog from "./EditFloorDialog";

const ShowRoomData = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["rooms"],
    queryFn: getAllRooms,
    refetchInterval: 5 * 60 * 1000,
  });

  console.log(data);

  const { mutateAsync } = useMutation({
    mutationFn: deleteRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });

  const roomsData = data?.success ? data.data : [];

  console.log(roomsData);
  
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableCaption>List of Rooms with actions</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Room Number</TableHead>
            <TableHead>Floor Number</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground"
              >
                Loading...
              </TableCell>
            </TableRow>
          ) : roomsData.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={2}
                className="text-center text-muted-foreground"
              >
                No floor data available.
              </TableCell>
            </TableRow>
          ) : (
            roomsData.map((room: RoomData, index: number) => (
              <TableRow key={room._id || index}>
                <TableCell className="font-medium">
                  {room.roomNumber}
                </TableCell>
                <TableCell className="font-medium">
                  {room.floorId?.floorNumber}
                </TableCell>
                <TableCell className="font-medium">
                  {room.type}
                </TableCell>
                <TableCell className="flex justify-center gap-4">
                  <EditRoomDialog room={room} />{" "}
                  <ConfirmDialog
                    trigger={
                      <Trash className="w-5 h-5 text-red-600 cursor-pointer hover:scale-110 transition-transform" />
                    }
                    title="Delete Room?"
                    description="This action will permanently delete the Room."
                    confirmText="Delete"
                    cancelText="Cancel"
                    onConfirm={async () => {
                      await mutateAsync(room._id);
                      toast.success("Room deleted successfully");
                    }}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ShowRoomData;
