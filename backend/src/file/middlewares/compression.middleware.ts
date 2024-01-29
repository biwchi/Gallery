// // image-compression.middleware.ts
// import {
//   ArgumentMetadata,
//   Injectable,
//   NestMiddleware,
//   PipeTransform,
// } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import * as sharp from 'sharp';

// @Injectable()
// export class CompressionPipe
//   implements PipeTransform<Express.Multer.File, Promise<string>>
// {
//   async transform(
//     value: Express.Multer.File,
//     metadata: ArgumentMetadata,
//   ): Promise<string> {

//   }

//   async use(req: Request, res: Response, next: NextFunction) {
//     if (req.file && req.file.mimetype.startsWith('image')) {
//       const compressedImageBuffer = await sharp(req.file.buffer)
//         .png({ quality: 60 })
//         .toBuffer();

//       req.file.buffer = compressedImageBuffer;
//     }

//     next();
//   }
// }
