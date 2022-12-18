import { ExtractJwt, Strategy as BaseJwtStrategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from 'src/users/user.entity';

interface JWTPayload  {
    userId: User['id'];
    userName: User['email'];
}

/**
 * @description JWTの認証処理を行うクラス
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(BaseJwtStrategy) {
    constructor(private readonly configService: ConfigService) {
        super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
        });
    }

    async validate(payload: JWTPayload): Promise<JWTPayload> {
        return {
            userId: payload.userId,
            userName: payload.userName
        };
    }
}
