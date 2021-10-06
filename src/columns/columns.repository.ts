import { EntityRepository, Repository } from 'typeorm';
import { CreateColumnDto } from './dto/create-column.dto';
import { UserColumn } from './columns.entity';
import { User } from 'src/auth/user.entities';

@EntityRepository(UserColumn)
export class ColumnsRepository extends Repository<UserColumn> {
  async getColumns(user: User): Promise<UserColumn[]> {
    const query = this.createQueryBuilder('columns');
    query.where(user);

    const columns = await query.getMany();
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
}
