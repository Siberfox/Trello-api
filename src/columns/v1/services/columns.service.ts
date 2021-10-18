import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateColumnDto } from '../create-column.dto';
import { UserColumn } from '../../columns.entity';
import { ColumnsRepository } from '../../columns.repository';
import { User } from 'src/users/user.entity';
import { EditColumnDto } from '../edit-column.dto';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(ColumnsRepository)
    private columnsRepository: ColumnsRepository,
  ) {}

  async getColumnById(columnId: string): Promise<UserColumn> {
    const column = await this.columnsRepository.findOne({
      where: { id: columnId },
    });

    if (!column) {
      throw new NotFoundException(`Column with ID "${columnId}" not found`);
    }

    return column;
  }

  async getColumns(): Promise<UserColumn[]> {
    const columns = await this.columnsRepository
      .createQueryBuilder('columns')
      .getMany();

    if (!columns.length) {
      throw new NotFoundException('Columns not found');
    }

    return columns;
  }

  async createColumn(
    createColumnDto: CreateColumnDto,
    user: User,
  ): Promise<UserColumn> {
    const { title, description } = createColumnDto;

    const column = this.columnsRepository.create({
      title,
      description,
      user,
    });

    await this.columnsRepository.save(column);
    return column;
  }

  async deleteColumn(columnId: string): Promise<void> {
    await this.columnsRepository.delete({ id: columnId });
  }

  async editColumn(editColumnDto: EditColumnDto): Promise<UserColumn> {
    const { columnId, ...properties } = editColumnDto;
    const column = await this.columnsRepository.findOne({
      where: { id: columnId },
    });

    const newColumn = await this.columnsRepository.create({
      ...column,
      ...properties,
    });
    await this.columnsRepository.save(newColumn);

    return newColumn;
  }
}
