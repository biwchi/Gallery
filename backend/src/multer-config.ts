import { MulterModuleOptions } from '@nestjs/platform-express';
import { config } from 'dotenv';
import { diskStorage } from 'multer';
import { resolve } from 'path';
import * as uuid4 from 'uuid4';

config();

export function multerConfig(): MulterModuleOptions {
  return {
    dest: process.env.FILE_STORAGE,
    storage: diskStorage({
      destination(_, __, cb) {
        cb(null, resolve(process.cwd(), process.env.FILE_STORAGE));
      },
      filename: (_, file, cb) => {
        cb(null, `${uuid4()}-${file.originalname}`);
      },
    }),
  };
}
