import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { Columns } from './columns.entity';
import { ColumnsService } from './columns.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Columns')
@Controller('columns')
@UseGuards(AuthGuard())
export class ColumnsController {
  constructor(private columnsService: ColumnsService) {}

  @ApiOperation({
    summary: 'Get column by id',
  })
  @ApiOkResponse({
    type: Columns,
  })
  @Get('/:id')
  getColumnById(@Param('id') id: string): Promise<Columns> {
    return this.columnsService.getColumnById(id);
  }

  @ApiOperation({
    summary: 'Create column',
  })
  @Post()
  createColumn(@Body() createColumnDto: CreateColumnDto) {
    return this.columnsService.createColumn(createColumnDto);
  }
}
