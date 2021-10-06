import { UserColumn } from 'src/columns/columns.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => UserColumn, (column) => column.user, { eager: true })
  columns: UserColumn[];
}
