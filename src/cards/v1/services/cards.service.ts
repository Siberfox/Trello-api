import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { ColumnsRepository } from 'src/columns/columns.repository';
import { Card } from '../../cards.entity';
import { CardsRepository } from '../../cards.repository';
import { CreateCardDto } from '../create-card.dto';
import { EditCardDto } from '../edit-card.dto';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(CardsRepository)
    private cardsRepository: CardsRepository,
    private columnsRepository: ColumnsRepository,
  ) {}

  async getCardById(id: string): Promise<Card> {
    const card = await this.cardsRepository.findOne({ where: { id } });

    if (!card) {
      throw new NotFoundException(`Card with ID "${id}" not found`);
    }

    return card;
  }

  async createCard(createCardDto: CreateCardDto, user: User): Promise<Card> {
    const { title, description, columnId } = createCardDto;
    const column = await this.columnsRepository.findOne({
      where: { id: columnId },
    });

    const card = this.cardsRepository.create({
      title,
      description,
      user,
      column,
    });

    await this.cardsRepository.save(card);
    return card;
  }

  async getCards(columnId: string): Promise<Card[]> {
    const cards = await this.cardsRepository
      .createQueryBuilder('cards')
      .where({ columnId })
      .getMany();

    if (!cards.length) {
      throw new NotFoundException('Cards not found');
    }
    return cards;
  }

  async deleteCard(id: string): Promise<void> {
    await this.cardsRepository.delete({ id });
  }

  async editCard(editCardDto: EditCardDto): Promise<Card> {
    const { cardId, ...properties } = editCardDto;
    const card = await this.cardsRepository.findOne({ where: { id: cardId } });

    const newCard = await this.cardsRepository.create({
      ...card,
      ...properties,
    });
    await this.cardsRepository.save(newCard);

    return newCard;
  }
}
