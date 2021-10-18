import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { CardsRepository } from 'src/cards/cards.repository';
import { Comment } from '../../comments.entity';
import { CommentsRepository } from '../../comments.repository';
import { CreateCommentDto } from '../create-comment.dto';
import { EditCommentDto } from '../edit-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsRepository)
    private commentsRepository: CommentsRepository,
    private cardRepository: CardsRepository,
  ) {}

  async getCommentById(id: string): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID "${id}" not found`);
    }

    return comment;
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

  async getComments(cardId: string): Promise<Comment[]> {
    const comments = await this.commentsRepository
      .createQueryBuilder('comments')
      .where({ cardId })
      .getMany();

    if (!comments.length) {
      throw new NotFoundException('Comments not found');
    }
    return comments;
  }

  async deleteComment(id: string): Promise<void> {
    await this.commentsRepository.delete({ id });
  }

  async editComment(editCommentDto: EditCommentDto): Promise<Comment> {
    const { commentId, message } = editCommentDto;
    const comment = await this.commentsRepository.findOne({
      where: { is: commentId },
    });

    const newComment = await this.commentsRepository.create({
      ...comment,
      message,
    });
    await this.commentsRepository.save(newComment);

    return newComment;
  }
}
