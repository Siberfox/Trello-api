import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CardsRepository } from 'src/cards/cards.repository';
import { CommentsController } from './v1/comments.controller';
import { CommentsRepository } from './comments.repository';
import { CommentsService } from './v1/services/comments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentsRepository, CardsRepository]),
    AuthModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
