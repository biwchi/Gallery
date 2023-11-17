import {
  Controller,
  FileTypeValidator,
  Get,
  Logger,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  StreamableFile,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiBody, ApiTags } from '@nestjs/swagger';
import {
  FileUploadInterceptor,
  FilesUploadInterceptor,
} from './file-upload.interceptor';
import { createReadStream } from 'fs';
import { join } from 'path';
import { CompressionMiddleware } from './middlewares/compression.middleware';

@Controller('file')
@ApiTags('Working with files')
export class FileController {
  /**
   * Get files
   */
  @Get()
  getFiles(@Param(':fileName') name: string) {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    return new StreamableFile(file);
  }

  /**
   * Upload files
   */
  @Post()
  @UseInterceptors(
    CompressionMiddleware,
    FileUploadInterceptor({ fieldName: 'file' }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  public upload(
    @UploadedFile(
      'file',
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 * 1024 }),
          new FileTypeValidator({ fileType: 'image/png' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): void {
    file.originalname;
  }
}
