import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/users/user.entity';
import { Card } from '../cards.entity';
import { CardsService } from './services/cards.service';
import { CreateCardDto } from './create-card.dto';
import { EditCardDto } from './edit-card.dto';

@ApiTags('Cards')
@Controller('cards')
@UseGuards(AuthGuard())
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @ApiOperation({ summary: 'Create card' })
  @ApiOkResponse({
    type: Card,
  })
  @Post()
  createCard(
    @Body() createCardDto: CreateCardDto,
    @GetUser() user: User,
  ): Promise<Card> {
    return this.cardsService.createCard(createCardDto, user);
  }

  @ApiOperation({ summary: 'Get cards' })
  @ApiOkResponse({
    type: Card,
    isArray: true,
  })
  @Get()
  getCards(@Body() columnId: string, @GetUser() user: User): Promise<Card[]> {
    return this.cardsService.getCards(columnId, user);
  }

  @ApiOperation({ summary: 'Get card by id' })
  @ApiOkResponse({
    type: Card,
  })
  @Get('/:id')
  getCardById(@Param('id') id: string, @GetUser() user: User): Promise<Card> {
    return this.cardsService.getCardById(id, user);
  }

  @ApiOperation({ summary: 'Edit card' })
  @ApiOkResponse({
    type: Card,
  })
  @Patch()
  editCard(
    @Body() editCardDto: EditCardDto,
    @GetUser() user: User,
  ): Promise<Card> {
    return this.cardsService.editCard(editCardDto, user);
  }

  @ApiOperation({ summary: 'Delete card' })
  @Delete('/:id/delete')
  deleteCard(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.cardsService.deleteCard(id, user);
  }
}
