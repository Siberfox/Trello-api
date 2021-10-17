import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { CardsRepository } from 'src/cards/cards.repository';
import { Comment } from './comments.entity';
import { CommentsRepository } from './comments.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { EditCommentDto } from './dto/edit-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsRepository)
    private commentsRepository: CommentsRepository,
    private cardRepository: CardsRepository,
  ) {}

  async getCommentById(id: string, user: User): Promise<Comment> {
    return this.commentsRepository.getCommentById(id, user);
  }

  async createComment(
    createCommentDto: CreateCommentDto,
    user: User,
  ): Promise<Comment> {
    const { message, cardId } = createCommentDto;
    const card = await this.cardRepository.findOne({
      where: { id: cardId },
    });

    const comment = this.commentsRepository.create({
      message,
      user,
      card,
    });

    await this.commentsRepository.save(comment);
    return comment;
  }

  async getComments(cardId: string, user: User): Promise<Comment[]> {
    return this.commentsRepository.getComments(cardId, user);
  }

  async deleteComment(id: string, user: User): Promise<void> {
    return this.commentsRepository.deleteComment(id, user);
  }

  async editComment(
    editCommentDto: EditCommentDto,
    user: User,
  ): Promise<Comment> {
    return this.commentsRepository.editComment(editCommentDto, user);
  }
}
