import { ConfigService } from '@nestjs/config';
import { MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { resolve } from 'path';
import * as uuid4 from 'uuid4';

export const multerConfig = (
  configService: ConfigService,
): MulterModuleOptions => ({
  storage: diskStorage({
    destination(_, __, cb) {
      cb(null, resolve(process.cwd(), configService.get('FILE_STORAGE')));
    },
    filename: (_, file, cb) => {
      cb(null, `${uuid4()}-${file.originalname}`);
    },
  }),
});
