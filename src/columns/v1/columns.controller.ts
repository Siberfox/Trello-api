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
import { CreateColumnDto } from './create-column.dto';
import { UserColumn } from '../columns.entity';
import { ColumnsService } from './services/columns.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/users/user.entity';
import { EditColumnDto } from './edit-column.dto';
import { ColumnOwnerGuard } from './guards/column-owner.guard';

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
  getColumns(): Promise<UserColumn[]> {
    return this.columnsService.getColumns();
  }

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
    summary: 'Edit column',
  })
  @ApiOkResponse({
    type: UserColumn,
  })
  @Patch('/edit')
  @UseGuards(ColumnOwnerGuard)
  editColumn(@Body() editColumnDto: EditColumnDto): Promise<UserColumn> {
    return this.columnsService.editColumn(editColumnDto);
  }

  @ApiOperation({
    summary: 'Delete column',
  })
  @Delete('/:id/delete')
  @UseGuards(ColumnOwnerGuard)
  deleteColumn(@Param('id') id: string): Promise<void> {
    return this.columnsService.deleteColumn(id);
  }
}
