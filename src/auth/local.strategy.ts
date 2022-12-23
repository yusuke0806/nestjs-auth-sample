import { Strategy as BaseLocalStrategy } from 'passport-local';
import { User } from 'src/users/user.entity';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(BaseLocalStrategy) {

    constructor(private authService: AuthService) {
        super();
    }

    async validate(username: User['email'], password: User['password']): Promise<any> {
        const user = await this.authService.validateUser(username, password);
        if (! user)
            throw new UnauthorizedException();

        return user;
    }
}
