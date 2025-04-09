import { User } from '../../../User';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      user?: User;
    }
  }
}