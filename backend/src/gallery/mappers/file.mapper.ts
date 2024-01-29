import { Injectable } from '@nestjs/common';
import { AppFile } from '../enities/file.entity';
import { FileDto } from '../dto/file.dto';
import { Request } from 'express';
import { getFullUrl } from 'src/utils';

@Injectable()
export class FileMapper {
  public fileEntityToDto(file: AppFile, req: Request) {
    const fileUrl = getFullUrl(req);
    return new FileDto(file, fileUrl);
  }
}
