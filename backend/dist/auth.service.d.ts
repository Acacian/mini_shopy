import { Repository } from 'typeorm';
import { User } from './entities';
import { ExtendedRequest } from './dto/extended-request.dto';
export declare class AuthService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    getUser(req: ExtendedRequest): Promise<User>;
}
