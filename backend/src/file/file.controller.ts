import {
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiBody, ApiTags } from '@nestjs/swagger';
import { FileUploadInterceptor } from './file-upload.interceptor';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@Controller('file')
@ApiTags('Working with files')
export class FileController {
  /**
   * Get files
   */
  @Get('/:fileName')
  getFile(@Param('fileName') name: string, @Res() res: Response) {
    const rootPath = join(__dirname, '..', 'uploads');
    res.sendFile(name, { root: rootPath });
  }

  /**
   * Upload files
   */
  @Post()
  @UseInterceptors(FileUploadInterceptor({ fieldName: 'file', fileFilter(req, file, callback) {
      file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf-8')
      callback(null, true)
  }, }))
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
    @UploadedFile()
    file: Express.Multer.File,
  ): void {
    Logger.log(file.filename);
  }
}
