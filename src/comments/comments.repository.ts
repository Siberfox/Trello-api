import { EntityRepository, Repository } from 'typeorm';
import { Comment } from './comments.entity';

@EntityRepository(Comment)
export class CommentsRepository extends Repository<Comment> {}
