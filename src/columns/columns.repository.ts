import { EntityRepository, Repository } from 'typeorm';
import { CreateColumnDto } from './dto/create-column.dto';
import { UserColumn } from './columns.entity';
import { User } from 'src/auth/user.entities';
import { NotFoundException } from '@nestjs/common';
import { EditColumnDto } from './dto/edit-column.dto';

@EntityRepository(UserColumn)
export class ColumnsRepository extends Repository<UserColumn> {
  async getColumnById(id: string, user: User): Promise<UserColumn> {
    const column = await this.findOne({ where: { id, user } });

    if (!column) {
      throw new NotFoundException(`Column with ID "${id}" not found`);
    }

    return column;
  }

  async getColumns(user: User): Promise<UserColumn[]> {
    const columns = await this.createQueryBuilder('columns')
      .where({ user })
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

    const column = this.create({
      title,
      description,
      user,
    });

    await this.save(column);
    return column;
  }

  async deleteColumn(columnId: string, user: User): Promise<void> {
    const result = await this.delete({ id: columnId, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Column with ID "${columnId}" not found`);
    }
  }

  async editColumn(
    editColumnDto: EditColumnDto,
    user: User,
  ): Promise<UserColumn> {
    const { columnId, ...properties } = editColumnDto;
    const column = await this.findOne({ where: { id: columnId, user } });

    if (!column) {
      throw new NotFoundException(`Column with ID "${columnId}" not found`);
    }

    const newColumn = await this.create({ ...column, ...properties });
    await this.save(newColumn);

    return newColumn;
  }
}
