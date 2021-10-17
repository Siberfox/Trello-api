import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class AuthTokenDto {
  @ApiProperty()
  @Column({ nullable: false })
  accessToken: string;
}
