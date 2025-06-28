import type { ApiError, ApiSuccess } from "../types/apiResponse";
import type { DashboardSummary, FloorData, RoomData, RoomUpdateData, Tenant } from "../types/types";
import axiosInstance from "./axiosInstance";

export const getDashboardSummary = async (): Promise<
  ApiSuccess<DashboardSummary> | ApiError
> => {
  try {
    const res = await axiosInstance.get<ApiSuccess<DashboardSummary>>(
      "/dashboard/summary"
    );
    return res.data;
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || "Something went wrong",
    };
  }
};
export const getTenantDetails = async (): Promise<
  ApiSuccess<Tenant[]> | ApiError
> => {
  try {
    const res = await axiosInstance.get<ApiSuccess<Tenant[]>>(
      "/dashboard/tenant-details"
    );
    return res.data;
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || "Something went wrong",
    };
  }
};
export const getFloors = async (): Promise<
  ApiSuccess<FloorData[]> | ApiError
> => {
  try {
    const res = await axiosInstance.get<ApiSuccess<FloorData[]>>("/floor");
    return res.data;
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || "Something went wrong",
    };
  }
};
export const deleteFloor = async (
  id: string
): Promise<ApiSuccess<{}> | ApiError> => {
  try {
    const res = await axiosInstance.delete<ApiSuccess<{}>>(
      `/floor/${id}`
    );
    return res.data;
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || "Something went wrong",
    };
  }
};

export const updateFloor = async ({
    id,
    floorNumber,
  }: {
    id: string;
    floorNumber: number;
  }): Promise<ApiSuccess<FloorData> | ApiError> => {
    try {
      const res = await axiosInstance.put<ApiSuccess<FloorData>>(
        `/floor/${id}`,
        { floorNumber }
      );
      return res.data;
    } catch (error: any) {
      return {
        success: false,
        message: error?.response?.data?.message || "Something went wrong",
      };
    }
  };
  

export const addRoomToFloor = async ({
    floorId,
    roomNumber,
    type,
  }: {
    floorId: string;
    roomNumber: string;
    type: "1-sharing" | "2-sharing" | "3-sharing";
  }) => {
    const res = await axiosInstance.post("/room", {
      floorId,
      roomNumber,
      type,
    });
    return res.data;
  };
  
  
  export const getAllRooms = async (): Promise<
  ApiSuccess<RoomData[]> | ApiError
> => {
  try {
    const res = await axiosInstance.get<ApiSuccess<RoomData[]>>("/room");
    return res.data;
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || "Something went wrong",
    };
  }
};

export const deleteRoom = async (
    id: string
  ): Promise<ApiSuccess<{}> | ApiError> => {
    try {
      const res = await axiosInstance.delete<ApiSuccess<{}>>(
        `/room/${id}`
      );
      return res.data;
    } catch (error: any) {
      return {
        success: false,
        message: error?.response?.data?.message || "Something went wrong",
      };
    }
  };


  export const updateRoom= async ({
    id,
    roomNumber,
    type
  }: {
    id: string;
    roomNumber: string;
    type: "1-sharing" | "2-sharing" | "3-sharing";
  }): Promise<ApiSuccess<RoomUpdateData> | ApiError> => {
    try {
      const res = await axiosInstance.put<ApiSuccess<RoomUpdateData>>(
        `/room/${id}`,
        { roomNumber,type }
      );
      return res.data;
    } catch (error: any) {
      return {
        success: false,
        message: error?.response?.data?.message || "Something went wrong",
      };
    }
  };


  export const getRoomsByFloor=async({
    floorId
  }:{
    floorId: string;
  }):Promise<ApiSuccess<any> | ApiError>=>{
    try {
      const res = await axiosInstance.get<ApiSuccess<any>>(
        `/room/floor/${floorId}`,
      
      );
      
      return res.data;
    } catch (error: any) {
      console.log(error);
      
      return {
        success: false,
        message: error?.response?.data?.message || "Something went wrong",
      };
    }
  }


  export const addBed = async ({
    bedNumber,
    roomId,
    status,
  }: {
    bedNumber: string;
    roomId: string;
    status: 'available'| 'occupied';
  }) => {
    const res = await axiosInstance.post("/bed", {
      bedNumber,
      roomId,
      status,
    });
    return res.data;
  };