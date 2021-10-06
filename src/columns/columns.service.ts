import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateColumnDto } from './dto/create-column.dto';
import { UserColumn } from './columns.entity';
import { ColumnsRepository } from './columns.repository';
import { User } from 'src/auth/user.entities';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(ColumnsRepository)
    private columnsRepository: ColumnsRepository,
  ) {}

  async getColumnById(id: string): Promise<UserColumn> {
    const column = await this.columnsRepository.findOne(id);

    if (!column) {
      throw new NotFoundException(`Column with ID "${id}" not found`);
    }

    return column;
  }

  async getColumns(user: User): Promise<UserColumn[]> {
    return this.columnsRepository.getColumns(user);
  }

  async createColumn(
    createColumnDto: CreateColumnDto,
    user: User,
  ): Promise<UserColumn> {
    return this.columnsRepository.createColumn(createColumnDto, user);
  }
}
