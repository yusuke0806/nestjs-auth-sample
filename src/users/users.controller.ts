import { UsersService } from 'src/users/users.service';
import { AuthService } from './../auth/auth.service';
import { CreateUserDTO } from './users.dto';
import { Body, Controller, Post } from "@nestjs/common";

@Controller('users')
export class UsersController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('/signup')
    create(@Body() body: CreateUserDTO) {
        console.log(body);
        return this.authService.register(body.email, body.password);
    }
}
