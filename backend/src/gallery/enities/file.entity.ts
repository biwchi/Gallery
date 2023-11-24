import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FileType } from '../common/enums';

@Entity({ schema: 'gallery' })
export class AppFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  fileName: string;

  @Column({ nullable: true })
  path: string;

  @Column()
  size: number;

  @Column({ type: 'varchar', length: 20 })
  mimeType: string;

  @CreateDateColumn()
  dateUploaded: Date;

  getType(): FileType {
    if (this.mimeType.startsWith('image')) return FileType.IMAGE;
    if (this.mimeType.startsWith('video')) return FileType.VIDEO;
    if (this.mimeType.startsWith('audio')) return FileType.AUDIO;
  }
}
