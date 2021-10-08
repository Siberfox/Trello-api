import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entities';
import { UserColumn } from 'src/columns/columns.entity';
import { Comment } from 'src/comments/comments.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Base } from '../common/entitites/base.entity';

@Entity()
export class Card extends Base {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  @ManyToOne(() => UserColumn, (column) => column.cards, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'columnId', referencedColumnName: 'id' })
  column: UserColumn;

  @OneToMany(() => Comment, (comment) => comment.card, { cascade: true })
  @Exclude({ toPlainOnly: true })
  comments: Comment[];

  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;
}
