import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { Owner } from './entities/owner.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Owner])],
  controllers: [OwnerController],
  providers: [OwnerService],
  exports: [OwnerService],
})
export class OwnerModule {}
