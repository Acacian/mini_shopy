import { User } from '../entities';
export interface ExtendedRequest extends Request {
    user?: User;
}
