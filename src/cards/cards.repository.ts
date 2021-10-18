import { EntityRepository, Repository } from 'typeorm';
import { Card } from './cards.entity';

@EntityRepository(Card)
export class CardsRepository extends Repository<Card> {}
