import { IsOptional, MaxLength } from 'class-validator';
import { FileType } from '../common/enums';
import { AppFile } from '../enities/file.entity';
import { getViewUrl } from 'src/utils';

export class FileDto {
  constructor(file: AppFile, url: string) {
    this.id = file.id;
    this.title = file.title;
    this.fileName = file.fileName;
    this.size = file.size;
    this.mimeType = file.mimeType;
    this.type = file.getType();
    this.fileUrl = getViewUrl(url, this.fileName, file.path);
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
   * File MIME type
   * @example 'image/png'
   */
  @MaxLength(20)
  mimeType: string;

  /**
   * File type
   * @example 'video'
   * @example 'image'
   */
  type: FileType;
}
