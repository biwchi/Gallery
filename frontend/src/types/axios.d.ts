import "axios";

declare module "axios" {
  interface InternalAxiosRequestConfig {
    retry?: boolean;
  }
  interface AxiosRequestConfig {
    retry?: boolean;
  }
}
