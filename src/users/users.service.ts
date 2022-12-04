import { CreateUserDTO } from './users.dto';
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { User } from "./user.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    create(email : CreateUserDTO['email'], password: CreateUserDTO['password']){
        const user = this.userRepository.create({email, password});
        return this.userRepository.save(user);
    }

    find(email: User['email']): Promise<User | undefined> {
        return this.userRepository.findOne({where: {email}});
    }
}
