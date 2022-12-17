import { AuthService } from './../auth/auth.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],

    providers: [UsersService, AuthService],

    controllers: [UsersController],

    exports: [UsersService],
})

export class UsersModule {}
