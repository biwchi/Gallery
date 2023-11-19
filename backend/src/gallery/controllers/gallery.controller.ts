import {
  Controller,
  Get,
  Logger,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import {
  FileUploadInterceptor,
  FilesUploadInterceptor,
} from 'src/file/file-upload.interceptor';
import { GalleryService } from '../services/gallery.service';
import { Request } from 'express';

@Controller('gallery')
@ApiTags('Working with projects files')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  /**
   * Get files list of any type
   */
  @Get()
  public getFiles(@Req() req: Request) {
    return this.galleryService.getAllFiles(req);
  }

  /**
   * Post multiple media files
   */
  @Post()
  @UseInterceptors(FilesUploadInterceptor({ fieldName: 'files', maxCount: 20 }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  public postManyFiles(@UploadedFiles() files: Express.Multer.File[]) {
    this.galleryService.createFiles(files)
    Logger.log('Files created')
  }
}
