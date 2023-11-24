import { IsOptional, MaxLength } from 'class-validator';
import { FileType } from '../common/enums';
import { AppFile } from '../enities/file.entity';
import { getViewUrl } from 'src/utils';
import { IsNull } from 'typeorm';
import * as path from 'path';

export class FileDto {
  constructor(file: AppFile, url: string) {
    this.id = file.id;
    this.title = file.title;
    this.fileName = file.fileName;
    this.dateUploaded = file.dateUploaded;
    this.size = file.size;
    this.type = file.getType();
    this.fileUrl = getViewUrl(url, this.fileName, file.path);

    if (file.getType() === FileType.AUDIO) {
      const fileName = path.parse(file.title).name;

      const artist = fileName.split('-')[0];
      const songName = fileName.split('-')[1];

      this.artist = artist;
      this.songName = songName;
    }
  }

  /**
   * File id
   */
  id: number;

  /**
   * File title
   * @example 'leto'
   */
  title: string;

  /**
   * File url
   * @example http://localhost:3000/api/file/e65c4e38-c3dd-4db3-b7c6-b34a671a21cc-a_TFaIsN11Y.jpg
   */
  fileUrl: string;

  /**
   * File name
   * @example 'leto.png'
   */
  fileName: string;

  /**
   * File path
   * @example 'video'
   */
  @IsOptional()
  path?: string;

  /**
   * File size in bytes
   * @example 31245656747
   */
  size: number;

  /**
   * File date uploaded
   * @example 2023-11-24T07:50:53.158Z
   */
  dateUploaded: Date;

  /**
   * File type
   * @example 'video'
   * @example 'image'
   */
  type: FileType;

  /**
   * If file is a song get its artist
   */
  artist: string | null = null;

  /**
   * If file is a song get its song name
   */
  songName: string | null = null;
}
