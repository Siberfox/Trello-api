import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCardDto {
  @ApiProperty()
  @IsString()
  columnId: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;
}
