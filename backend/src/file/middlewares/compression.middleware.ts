// image-compression.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as sharp from 'sharp';

@Injectable()
export class CompressionMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if (req.file && req.file.mimetype.startsWith('image')) {
      
      const compressedImageBuffer = await sharp(req.file.buffer)
        .jpeg({quality: 60})
        .toBuffer();
      
      req.file.buffer = compressedImageBuffer;
    }

    next();
  }
}