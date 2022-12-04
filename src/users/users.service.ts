import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    findByEmail(email: User['email']): Promise<User | undefined> {
        return this.userRepository.findOne({where: {email}});
    }
}
