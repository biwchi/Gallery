import {
  Controller,
  Get,
  Logger,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesUploadInterceptor } from 'src/file/file-upload.interceptor';
import { GalleryService } from '../services/gallery.service';
import { Request } from 'express';
import { AppQueryDto } from 'src/shared/dto/app-query.dto';
import { FileDto } from '../dto/file.dto';
import { ApiGenericResponse } from 'src/shared/swagger/generic-response';

@Controller('gallery')
@ApiTags('Working with projects files')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  /**
   * Get files list of any type
   */
  @Get()
  @ApiGenericResponse(FileDto)
  public getFiles(@Query() query: AppQueryDto, @Req() req: Request) {
    return this.galleryService.getAllFiles(req, query);
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
    this.galleryService.createFiles(files);
  }
}
