import { User } from 'src/users/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

type PasswordOmitUser = Omit<User, 'password'>;

interface JWTPayload  {
    userId: User['id'];
    userName: User['email'];
}

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async register(email: string, password: string) {
        const saltRounds: number = 16;

        const hashPassword = await bcrypt.hash(password, saltRounds);

        return await this.usersService.create(email, hashPassword);
    }

    async validateUser(email: User['email'], password: User['password']) {
        const user = await this.usersService.find(email);
        if (user && bcrypt.compareSync(password, user.password)) {
            const { password, ...result } = user;

            return result;
        }

        return null;
    }

    async login(user: PasswordOmitUser) {
        const payload: JWTPayload = { userId: user.id, userName: user.email };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
