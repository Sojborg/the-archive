import { IUser } from "../controllers/loginController";
import { User } from "../models/User";
import { BaseRepository } from "./BaseRepositoty";

class UserRepository extends BaseRepository<any> {
    
  async createUser(user: IUser) {
    try {
      const userModel = new User(user);
      await userModel.save();
    } catch (e) {
      console.error('createUser', e);
      throw e;
    }     
  }

  async getUserByUsername(username: string): Promise<IUser | null> {
    try {
      return await User.findOne({username});
    } catch (e) {
      console.error('getUserByUsername', e);
      throw e;
    }
  }
}

export const userRepository = new UserRepository('Users');