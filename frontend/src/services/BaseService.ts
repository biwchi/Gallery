import { API_ENDPOINT } from "@/constants";
import { TokensData } from "@/services/AuthService/types";
import axios, { AxiosError, AxiosInstance } from "axios";

export abstract class BaseService {
  protected readonly instance: AxiosInstance;

  protected accessToken: string;
  protected refreshToken: string;

  constructor() {
    this.accessToken = localStorage.getItem("accessToken") || "";
    this.refreshToken = localStorage.getItem("refreshToken") || "";

    this.instance = axios.create({
      baseURL: API_ENDPOINT,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.accessTokenInterceptor();
    this.refreshTokenInterceptor();
  }

  private accessTokenInterceptor() {
    this.instance.interceptors.request.use(
      (config) => {
        const token = `Baarer ${this.accessToken}`;
        config.headers.Authorization = token;

        return config;
      },
      (err) => Promise.reject(err),
    );
  }

  private refreshTokenInterceptor() {
    this.instance.interceptors.request.use(
      (response) => response,
      async (error: AxiosError) => {
        if (
          /* prettier-ignore */
          !error.config ||
          !error.response ||

          !this.accessToken &&
          !this.refreshToken ||

          (
            error.response.status !== 401 &&
            error.response.status !== 403
          )
        ) {
          return Promise.reject(error);
        }

        if (
          /* prettier-ignore */
          error.config.retry &&
          (
            error.response.status === 401 ||
            error.response.status === 403
          )
        ) {
          return Promise.reject(error);
        }

        try {
          const { data } = await this.instance.post<TokensData>(
            "auth/refresh",
            {
              refreshToken: this.refreshToken,
            },
            {
              retry: true,
            },
          );

          this.accessToken = data.accessToken;

          return this.instance.request({
            ...error.config,
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
            },
          });
        } catch (error) {
          console.error(error);

          localStorage.setItem("accessToken", "");
          localStorage.setItem("refreshToken", "");
        }

        return Promise.reject(error);
      },
    );
  }
}
