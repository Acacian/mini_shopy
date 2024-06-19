import { Repository } from 'typeorm';
import { User } from './entities';
interface RequestWithUser extends Request {
    user?: User;
}
export declare class AuthService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    getUser(req: RequestWithUser): Promise<User>;
    login(username: string, password: string): Promise<User>;
    logout(req: RequestWithUser): Promise<void>;
}
export {};
