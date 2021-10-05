import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entities';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {}
