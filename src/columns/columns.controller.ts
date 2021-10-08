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
import { CreateColumnDto } from './dto/create-column.dto';
import { UserColumn } from './columns.entity';
import { ColumnsService } from './columns.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entities';
import { EditColumnDto } from './dto/edit-column.dto';

@ApiTags('Columns')
@Controller('columns')
@UseGuards(AuthGuard())
export class ColumnsController {
  constructor(private columnsService: ColumnsService) {}

  @ApiOperation({
    summary: 'Create column',
  })
  @Post('')
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
    type: UserColumn,
    isArray: true,
  })
  @Get()
  getColumns(@GetUser() user: User): Promise<UserColumn[]> {
    return this.columnsService.getColumns(user);
  }

  @ApiOperation({
    summary: 'Get column by id',
  })
  @ApiOkResponse({
    type: UserColumn,
  })
  @Get('/:id')
  getColumnById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<UserColumn> {
    return this.columnsService.getColumnById(id, user);
  }

  @ApiOperation({
    summary: 'Edit column',
  })
  @ApiOkResponse({
    type: UserColumn,
  })
  @Patch('/edit')
  editColumn(
    @Body() editColumnDto: EditColumnDto,
    @GetUser() user: User,
  ): Promise<UserColumn> {
    return this.columnsService.editColumn(editColumnDto, user);
  }

  @ApiOperation({
    summary: 'Delete column',
  })
  @Delete('/:id/delete')
  deleteColumn(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.columnsService.deleteColumn(id, user);
  }
}
