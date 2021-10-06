import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnsRepository } from './columns.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ColumnsRepository]), AuthModule],
  providers: [ColumnsService],
  controllers: [ColumnsController],
})
export class ColumnsModule {}
