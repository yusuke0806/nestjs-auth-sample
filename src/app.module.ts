import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.modules';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
  ],
})
export class AppModule {}
