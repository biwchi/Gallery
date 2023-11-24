export type TokensData = {
  accessToken: string;
  refreshToken: string;
};

export type LoginDto = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  email: string;
  name: string;
};

export type RegisterDto = LoginDto & { name: string };
