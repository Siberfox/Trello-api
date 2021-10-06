import { CreateCardDto } from 'src/cards/dto/create-card.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Comments } from './comments.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@EntityRepository(Comments)
export class CommentsRepository extends Repository<Comments> {
  async createComment(createCommentDto: CreateCommentDto): Promise<Comments> {
    const { message } = createCommentDto;

    const comment = this.create({
      message,
    });

    await this.save(comment);
    return comment;
  }
}
