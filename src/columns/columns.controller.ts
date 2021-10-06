import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { UserColumn } from './columns.entity';
import { ColumnsService } from './columns.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entities';

@ApiTags('Columns')
@Controller('columns')
@UseGuards(AuthGuard())
export class ColumnsController {
  constructor(private columnsService: ColumnsService) {}

  @ApiOperation({
    summary: 'Get column by id',
  })
  @ApiOkResponse({
    type: UserColumn,
  })
  @Get('/:id')
  getColumnById(@Param('id') id: string): Promise<UserColumn> {
    return this.columnsService.getColumnById(id);
  }

  @ApiOperation({
    summary: 'Create column',
  })
  @Post('/create')
  createColumn(
    @Body() createColumnDto: CreateColumnDto,
    @GetUser() user: User,
  ) {
    return this.columnsService.createColumn(createColumnDto, user);
  }

  @ApiOperation({
    summary: 'Get columns',
  })
  @ApiOkResponse({
    type: [UserColumn],
  })
  @Get()
  getColumns(@GetUser() user: User): Promise<UserColumn[]> {
    return this.columnsService.getColumns(user);
  }
}
