import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateColumnDto } from './dto/create-column.dto';
import { Columns } from './columns.entity';
import { ColumnsRepository } from './columns.repository';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(ColumnsRepository)
    private columnsRepository: ColumnsRepository,
  ) {}

  async getColumnById(id: string): Promise<Columns> {
    const column = await this.columnsRepository.findOne(id);

    if (!column) {
      throw new NotFoundException(`Column with ID "${id}" not found`);
    }

    return column;
  }

  async createColumn(createColumnDto: CreateColumnDto): Promise<Columns> {
    return this.columnsRepository.createColumn(createColumnDto);
  }
}
