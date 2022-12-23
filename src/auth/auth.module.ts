import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { UsersModule } from './../users/users.modules';
import { Module } from "@nestjs/common";
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module ({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => {
                return {
                    secret: configService.get<string>('JWT_SECRET_KEY'),
                    signOptions: {
                    expiresIn: '1200s'
                    },
                };
            },
            inject: [ConfigService],
        }),
    ],
    providers: [JwtStrategy, AuthService, LocalStrategy],
    exports: [AuthService],
})

export class AuthModule {}
