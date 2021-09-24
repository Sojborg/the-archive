import { IUser } from "../controllers/loginController";
import { BaseRepository } from "./BaseRepositoty";

class UserRepository extends BaseRepository<any> {
    

  getUserByUsername(username: string): Promise<IUser | null> {
    try {
      return new Promise((resolve, reject) => {
        this.client
          .queryDocuments<IUser>(
            `${this.databaseUrl}/colls/${this.collection}`,
            `SELECT * FROM Users WHERE Users.username = "${username}"`
          )
          .toArray((err, results) => {
            if (err) reject(err);
            else {
              resolve(results.length > 0 ? results[0] : null);
            }
          });
      });
    } catch (e) {
      console.error('getUserByUsername', e);
      throw e;
    }
  }
}

export const userRepository = new UserRepository('Users');