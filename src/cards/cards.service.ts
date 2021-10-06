import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cards } from './cards.entity';
import { CardsRepository } from './cards.repository';
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(CardsRepository)
    private cardsRepository: CardsRepository,
  ) {}

  async getCardById(id: string): Promise<Cards> {
    const card = await this.cardsRepository.findOne(id);

    if (!card) {
      throw new NotFoundException(`Card with ID "${id}" not found`);
    }

    return card;
  }

  async createCard(createCardDto: CreateCardDto): Promise<Cards> {
    return this.cardsRepository.createCard(createCardDto);
  }
}
