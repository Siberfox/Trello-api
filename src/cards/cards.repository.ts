import { NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/user.entities';
import { EntityRepository, Repository } from 'typeorm';
import { Card } from './cards.entity';
import { EditCardDto } from './dto/edit-card.dto';

@EntityRepository(Card)
export class CardsRepository extends Repository<Card> {
  async getCards(columnId: string, user: User): Promise<Card[]> {
    const cards = await this.createQueryBuilder('cards')
      .where({ columnId, user })
      .getMany();

    if (!cards.length) {
      throw new NotFoundException('Cards not found');
    }
    return cards;
  }

  async getCardById(id: string, user: User): Promise<Card> {
    const card = await this.findOne({ where: { id, user } });

    if (!card) {
      throw new NotFoundException(`Card with ID "${id}" not found`);
    }

    return card;
  }

  async deleteCard(id: string, user: User): Promise<void> {
    const result = await this.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Cards with ID "${id}" not found`);
    }
  }

  async editCard(editCardDto: EditCardDto, user: User): Promise<Card> {
    const { cardId, ...properties } = editCardDto;
    const card = await this.findOne({ where: { id: cardId, user } });

    if (!card) {
      throw new NotFoundException(`Cards with ID "${cardId}" not found`);
    }

    const newCard = await this.create({ ...card, ...properties });
    await this.save(newCard);

    return newCard;
  }
}
