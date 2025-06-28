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
import { getFloors, deleteFloor } from "../../../apis/api";
import { Pencil, Trash } from "lucide-react";
//   import ConfirmDialog from "@/components/custom/common/ConfirmDialog";
import type { FloorData } from "../../../types/types";
import ConfirmDialog from "../../ui/ConfirmDialog";
import { toast } from "sonner";
import EditFloorDialog from "./EditFloorDialog";

const ShowFloorData = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["floors"],
    queryFn: getFloors,
    refetchInterval: 5 * 60 * 1000,
  });

  console.log(data);

  const { mutateAsync } = useMutation({
    mutationFn: deleteFloor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["floors"] });
    },
  });

  const floors = data?.success ? data.data : [];

   

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableCaption>List of floors with actions</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Floor Number</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={2}
                className="text-center text-muted-foreground"
              >
                Loading...
              </TableCell>
            </TableRow>
          ) : floors.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={2}
                className="text-center text-muted-foreground"
              >
                No floor data available.
              </TableCell>
            </TableRow>
          ) : (
            floors.map((floor: FloorData, index: number) => (
              <TableRow key={floor._id || index}>
                <TableCell className="font-medium">
                  {floor.floorNumber}
                </TableCell>
                <TableCell className="flex justify-center gap-4">
                <EditFloorDialog floor={floor} />                  <ConfirmDialog
                    trigger={
                      <Trash className="w-5 h-5 text-red-600 cursor-pointer hover:scale-110 transition-transform" />
                    }
                    title="Delete Floor?"
                    description="This action will permanently delete the floor."
                    confirmText="Delete"
                    cancelText="Cancel"
                    onConfirm={async () => {
                      await mutateAsync(floor._id);
                      toast.success("Floor deleted successfully");
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

export default ShowFloorData;
