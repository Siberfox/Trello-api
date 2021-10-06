import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Comments } from './comments.entity';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('Comments')
@Controller('comments')
@UseGuards(AuthGuard())
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Get comment by id' })
  @ApiOkResponse({
    type: Comments,
  })
  @Get('/:id')
  getCommentById(@Param('id') id: string): Promise<Comments> {
    return this.commentsService.getCommentById(id);
  }

  @ApiOperation({ summary: 'Create comment' })
  @Post()
  createComment(@Body() createCommentDto: CreateCommentDto): Promise<Comments> {
    return this.commentsService.createComment(createCommentDto);
  }
}
