import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  cardId: string;

  @ApiProperty()
  @IsString()
  message: string;
}
