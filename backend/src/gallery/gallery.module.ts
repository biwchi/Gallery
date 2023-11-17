import { Module } from '@nestjs/common';
import { GalleryController } from './controllers/gallery.controller';
import { MediaService } from './services/media.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [GalleryController],
  providers: [MediaService, ConfigService],
})
export class GalleryModule {}
