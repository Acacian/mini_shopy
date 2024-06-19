import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities';
import * as bcrypt from 'bcrypt';

interface RequestWithUser extends Request {
  user?: User;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUser(req: RequestWithUser): Promise<User> {
    const userId = req.user?.id;
    if (!userId) {
      throw new Error('User not found');
    }
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async login(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async logout(req: RequestWithUser): Promise<void> {
    // 로그아웃 로직을 추가하세요. 예: 세션 파괴 또는 JWT 무효화
    // 예시: req.session.destroy();
  }
}
