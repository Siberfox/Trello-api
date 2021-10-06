import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { Columns } from './columns.entity';
import { ColumnsService } from './columns.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('columns')
@UseGuards(AuthGuard())
export class ColumnsController {
  constructor(private columnsService: ColumnsService) {}

  @Get('/:id')
  getColumnById(@Param('id') id: string): Promise<Columns> {
    return this.columnsService.getColumnById(id);
  }

  @Post()
  createColumn(@Body() createColumnDto: CreateColumnDto) {
    return this.columnsService.createColumn(createColumnDto);
  }
}
