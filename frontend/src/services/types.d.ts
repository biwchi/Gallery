export type Paginate<T> = {
  count: number;
  next: boolean;
  previous: boolean;
  result: T[];
};

export type * from "./AuthService/types";
export type * from "./GalleryService/types";
