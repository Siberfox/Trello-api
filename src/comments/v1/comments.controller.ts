import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/users/user.entity';
import { Comment } from '../comments.entity';
import { CommentsService } from './services/comments.service';
import { CreateCommentDto } from './create-comment.dto';
import { EditCommentDto } from './edit-comment.dto';

@ApiTags('Comments')
@Controller('comments')
@UseGuards(AuthGuard())
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Create comment' })
  @Post('')
  createComment(
    @Body() createCommentDto: CreateCommentDto,
    @GetUser() user: User,
  ): Promise<Comment> {
    return this.commentsService.createComment(createCommentDto, user);
  }

  @ApiOperation({ summary: 'Get comments' })
  @ApiOkResponse({
    type: Comment,
    isArray: true,
  })
  @Get()
  getComments(
    @Body() cardId: string,
    @GetUser() user: User,
  ): Promise<Comment[]> {
    return this.commentsService.getComments(cardId, user);
  }

  @ApiOperation({ summary: 'Get comment by id' })
  @ApiOkResponse({
    type: Comment,
  })
  @Get('/:id')
  getCommentById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Comment> {
    return this.commentsService.getCommentById(id, user);
  }

  @ApiOperation({ summary: 'Edit comment' })
  @Patch('/edit')
  editComment(
    @Body() editCommentDto: EditCommentDto,
    @GetUser() user: User,
  ): Promise<Comment> {
    return this.commentsService.editComment(editCommentDto, user);
  }

  @ApiOperation({ summary: 'Delete comment' })
  @Delete('/:id/delete')
  deleteComment(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.commentsService.deleteComment(id, user);
  }
}
