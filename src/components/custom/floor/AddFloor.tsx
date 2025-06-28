// src/components/custom/floor/AddFloor.tsx
import { useState, type SetStateAction } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
// import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../apis/axiosInstance";

const AddFloor = () => {
  const [floorNumber, setFloorNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleAddFloor = async () => {
    if (!floorNumber) return toast.error("Please enter floor number");

    setIsLoading(true);
    try {
      await axiosInstance.post("/floor", {
        floorNumber: parseInt(floorNumber),
      });
      toast.success("Floor added successfully");
      setFloorNumber("");
      queryClient.invalidateQueries({ queryKey: ["floors"] });
    } catch (err) {
      // error is handled by interceptor
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="floor">Enter Floor Number</Label>
          <Input
            id="floor"
            type="number"
            placeholder="e.g. 3"
            value={floorNumber}
            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setFloorNumber(e.target.value)}
          />
        </div>
        <Button onClick={handleAddFloor} className="w-full" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Floor"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddFloor;
