import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AppFile } from '../enities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FileMapper } from '../mappers/file.mapper';
import { Request } from 'express';

@Injectable()
export class GalleryService {
  constructor(
    private readonly fileMapper: FileMapper,
    @InjectRepository(AppFile)
    private readonly fileRepository: Repository<AppFile>,
  ) {}

  public async getAllFiles(req: Request) {
    const files = await this.fileRepository.find();
    return files.map((file) => this.fileMapper.fileEntityToDto(file, req));
  }

  public async createFiles(files: Express.Multer.File[]) {
    const filesEnity = files.map((file) =>
      this.fileRepository.create({
        title: file.originalname,
        fileName: file.filename,
        mimeType: file.mimetype,
        size: file.size,
      }),
    );

    await this.fileRepository.save(filesEnity);
  }
}
