import { Exclude } from 'class-transformer';
import { Card } from 'src/cards/cards.entity';
import { UserColumn } from 'src/columns/columns.entity';
import { Comment } from 'src/comments/comments.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from '../common/entitites/base.entity';

@Entity()
export class User extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @OneToMany(() => UserColumn, (column) => column.user, { cascade: true })
  userColumns: UserColumn[];

  @OneToMany(() => Card, (cards) => cards.user, { cascade: true })
  cards: Card[];

  @OneToMany(() => Comment, (comments) => comments.user, { cascade: true })
  comments: Comment[];
}
