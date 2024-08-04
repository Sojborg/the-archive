import { IUser, User } from "../models/User";

class UserRepository {
    
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

export const userRepository = new UserRepository();