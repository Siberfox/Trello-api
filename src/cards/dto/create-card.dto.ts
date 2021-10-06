import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;
}
