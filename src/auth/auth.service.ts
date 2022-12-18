import { User } from 'src/users/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { bcrypt }  from 'bcrypt';

const scrypt = promisify(_scrypt);
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
        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        const hashPassword = `${salt}.${hash.toString('hex')}`;

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
