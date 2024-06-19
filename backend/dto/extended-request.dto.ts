import { Request } from '@nestjs/common';
import { User } from '../entities';

export interface ExtendedRequest extends Request {
  user?: User;
}
