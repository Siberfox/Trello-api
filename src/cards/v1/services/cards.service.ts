import { Injectable } from '@nestjs/common';
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

  async getCardById(id: string, user: User): Promise<Card> {
    return this.cardsRepository.getCardById(id, user);
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

  async getCards(columnId: string, user: User): Promise<Card[]> {
    return this.cardsRepository.getCards(columnId, user);
  }

  async deleteCard(id: string, user: User): Promise<void> {
    return this.cardsRepository.deleteCard(id, user);
  }

  async editCard(editCardDto: EditCardDto, user: User): Promise<Card> {
    return this.cardsRepository.editCard(editCardDto, user);
  }
}
