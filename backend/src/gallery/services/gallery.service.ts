import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { AppFile } from '../enities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FileMapper } from '../mappers/file.mapper';
import { Request } from 'express';
import { AppQueryDto } from 'src/shared/dto/app-query.dto';
import { AppResponseDto } from 'src/shared/dto/app-response.dto';
import { Sorting } from 'src/shared/decorators/sorting-params';

@Injectable()
export class GalleryService {
  constructor(
    private readonly fileMapper: FileMapper,
    @InjectRepository(AppFile)
    private readonly fileRepository: Repository<AppFile>,
  ) {}

  public async getAllFiles(req: Request, query: AppQueryDto, sorting: Sorting) {
    const [files, itemCount] = await this.fileRepository.findAndCount({
      skip: query.offset,
      take: query.limit,
      where: {
        title: query.search && Like(`%${query.search}%`),
        mimeType: query.type && Like(`%${query.type}%`),
      },
      order: {
        ...sorting
      }
    });

    const result = files.map((file) =>
      this.fileMapper.fileEntityToDto(file, req),
    );

    return new AppResponseDto(itemCount, result, query);
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
