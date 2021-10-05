import { EntityRepository, Repository } from 'typeorm';
import { CreateColumnDto } from './dto/create-column.dto';
import { Columns } from './columns.entity';

@EntityRepository(Columns)
export class ColumnsRepository extends Repository<Columns> {
  async createColumn(createColumnDto: CreateColumnDto): Promise<Columns> {
    const { title, description } = createColumnDto;

    const column = this.create({
      title,
      description,
    });

    await this.save(column);
    return column;
  }
}
