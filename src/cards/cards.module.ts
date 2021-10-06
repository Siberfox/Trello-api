import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CardsController } from './cards.controller';
import { CardsRepository } from './cards.repository';
import { CardsService } from './cards.service';

@Module({
  imports: [TypeOrmModule.forFeature([CardsRepository]), AuthModule],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
