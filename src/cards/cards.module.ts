import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ColumnsRepository } from 'src/columns/columns.repository';
import { CardsController } from './v1/cards.controller';
import { CardsRepository } from './cards.repository';
import { CardsService } from './v1/services/cards.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CardsRepository, ColumnsRepository]),
    AuthModule,
  ],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
