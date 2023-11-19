import { Module } from '@nestjs/common';
import { GalleryController } from './controllers/gallery.controller';
import { GalleryService } from './services/gallery.service';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppFile } from './enities/file.entity';
import { FileMapper } from './mappers/file.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([AppFile])],
  controllers: [GalleryController],
  providers: [GalleryService, ConfigService, FileMapper],
})
export class GalleryModule {}
