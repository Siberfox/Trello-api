import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { Card } from 'src/cards/cards.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Base } from '../common/entitites/base.entity';

@Entity()
export class Comment extends Base {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  message: string;

  @ManyToOne(() => Card, (card) => card.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cardId', referencedColumnName: 'id' })
  card: Card;

  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;
}
