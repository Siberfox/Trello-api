import { EntityRepository, Repository } from 'typeorm';
import { Cards } from './cards.entity';
import { CreateCardDto } from './dto/create-card.dto';

@EntityRepository(Cards)
export class CardsRepository extends Repository<Cards> {
  async createCard(createCardDto: CreateCardDto): Promise<Cards> {
    const { title, description } = createCardDto;

    const card = this.create({
      title,
      description,
    });

    await this.save(card);
    return card;
  }
}
