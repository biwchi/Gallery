import { BaseService } from "@/services/BaseService";
import { Paginate } from "../types";
import { AppFile } from "./types";

class GalleryService extends BaseService {
  public getAll() {
    return this.instance.get<Paginate<AppFile>>("gallery");
  }

  public createFiles(data: FormData) {
    return this.instance.post("gallery", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
}

export default new GalleryService();
