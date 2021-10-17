import { NotFoundException } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Comment } from './comments.entity';
import { EditCommentDto } from './dto/edit-comment.dto';

@EntityRepository(Comment)
export class CommentsRepository extends Repository<Comment> {
  async getComments(cardId: string, user: User): Promise<Comment[]> {
    const comments = await this.createQueryBuilder('comments')
      .where({ cardId, user })
      .getMany();

    if (!comments.length) {
      throw new NotFoundException('Comments not found');
    }
    return comments;
  }

  async getCommentById(id: string, user: User): Promise<Comment> {
    const comment = await this.findOne({ where: { id, user } });

    if (!comment) {
      throw new NotFoundException(`Comment with ID "${id}" not found`);
    }

    return comment;
  }

  async deleteComment(id: string, user: User): Promise<void> {
    const result = await this.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Comments with ID "${id}" not found`);
    }
  }

  async editComment(
    editCommentDto: EditCommentDto,
    user: User,
  ): Promise<Comment> {
    const { commentId, message } = editCommentDto;
    const comment = await this.findOne({ where: { is: commentId, user } });

    if (!comment) {
      throw new NotFoundException(`Comment with ID "${commentId}" not found`);
    }

    const newComment = await this.create({ ...comment, message });
    await this.save(newComment);

    return newComment;
  }
}
