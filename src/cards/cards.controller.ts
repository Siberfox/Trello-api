import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Cards } from './cards.entity';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';

@ApiTags('Cards')
@Controller('cards')
@UseGuards(AuthGuard())
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @ApiOperation({ summary: 'Get card by id' })
  @ApiOkResponse({
    type: Cards,
  })
  @Get('/:id')
  getCardById(@Param('id') id: string): Promise<Cards> {
    return this.cardsService.getCardById(id);
  }

  @ApiOperation({ summary: 'Create card' })
  @Post('/create')
  createCard(@Body() createCardDto: CreateCardDto): Promise<Cards> {
    return this.cardsService.createCard(createCardDto);
  }
}
