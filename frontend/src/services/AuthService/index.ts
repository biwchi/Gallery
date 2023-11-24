import { BaseService } from "@/services/BaseService";
import { LoginDto, RegisterDto, TokensData, User } from "./types";

class AuthService extends BaseService {
  public async login(data: LoginDto) {
    return this.instance.post<TokensData>("auth/login", data);
  }

  public async register(data: RegisterDto) {
    return this.instance.post<TokensData>("auth/register", data);
  }

  public async profile() {
    return this.instance.get<User>("auth/profile");
  }
}

export default new AuthService();
