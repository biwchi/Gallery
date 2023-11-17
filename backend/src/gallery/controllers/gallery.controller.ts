import { Controller, Get, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import {
  FileUploadInterceptor,
  FilesUploadInterceptor,
} from 'src/file/file-upload.interceptor';

@Controller('gallery')
@ApiTags('Working with projects files')
export class GalleryController {
  constructor() {}

  @Get()
  public Hello() {
    return 'hello';
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
    files.forEach((file) => console.log(file.originalname));
  }
}
