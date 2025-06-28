export interface ApiSuccess<T> {
    success: true;
    message: string;
    data: T;
  }
  
  // For error response
  export interface ApiError {
    success: false;
    message: string;
  }