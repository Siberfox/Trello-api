import { Injectable } from '@nestjs/common';
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

  async getColumnById(columnId: string, user: User): Promise<UserColumn> {
    return this.columnsRepository.getColumnById(columnId, user);
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

  async deleteColumn(columnId: string, user: User): Promise<void> {
    return this.columnsRepository.deleteColumn(columnId, user);
  }

  async editColumn(
    editColumnDto: EditColumnDto,
    user: User,
  ): Promise<UserColumn> {
    return this.columnsRepository.editColumn(editColumnDto, user);
  }
}
