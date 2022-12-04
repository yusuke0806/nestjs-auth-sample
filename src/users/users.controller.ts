import { CreateUserDTO } from './users.dto';
import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() request: CreateUserDTO) {
        return this.usersService.create(request.email, request.password);
    }
}
