import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user', { schema: 'usr' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  email: string;

  @Column({ select: false, type: 'varchar', length: 200 })
  password: string;

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ select: false, nullable: true, type: 'varchar', length: 400 })
  refresh_token: string;
}
