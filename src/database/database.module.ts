import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from 'src/users/user.entity';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [
                ConfigModule.forRoot({
                    envFilePath: [".env"],
                }),
            ],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: "postgres",
                host: configService.get("POSTGRES_HOST"),
                port: configService.get("POSTGRES_PORT"),
                database: configService.get("POSTGRES_DATABASE"),
                username: configService.get("POSTGRES_USER"),
                password: configService.get("POSTGRES_PASSWORD"),
                entities: [User],
                synchronize: true,
            }),
        })
    ]
})

export class DatabaseModule {}