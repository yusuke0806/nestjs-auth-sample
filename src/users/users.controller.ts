import { UsersService } from 'src/users/users.service';
import { AuthService } from './../auth/auth.service';
import { CreateUserDTO } from './users.dto';
import { User } from './user.entity';
import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';

type PasswordOmitUser = Omit<User, "password">

@Controller('users')
export class UsersController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('/signup')
    create(@Body() body: CreateUserDTO) {
        return this.authService.register(body.email, body.password);
    }

    // @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Request() req: {user: PasswordOmitUser }) {
        const user = req.user;
        return this.authService.login(req.user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/profile')
    async profile(@Request() req: {user: PasswordOmitUser }) {
        const user = req.user;

        return req.user;
    }
}
