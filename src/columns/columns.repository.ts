import { EntityRepository, Repository } from 'typeorm';
import { UserColumn } from './columns.entity';

@EntityRepository(UserColumn)
export class ColumnsRepository extends Repository<UserColumn> {}
