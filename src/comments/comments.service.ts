import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from './comments.entity';
import { CommentsRepository } from './comments.repository';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsRepository)
    private commentsRepository: CommentsRepository,
  ) {}

  async getCommentById(id: string): Promise<Comments> {
    const comment = await this.commentsRepository.findOne(id);

    if (!comment) {
      throw new NotFoundException(`Comment with ID "${id}"" not found`);
    }

    return comment;
  }

  async createComment(createCommentDto: CreateCommentDto): Promise<Comments> {
    return this.commentsRepository.createComment(createCommentDto);
  }
}
