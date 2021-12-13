import IUserRepository from '../../domain/repositories/IUserRepository'
import { UserModel } from "../../domain/models/userModel";
import { AppContext } from '../../infrastructure/config/AppContext';


export default class UserUseCases {
  userRepository: IUserRepository;

  constructor({ repositories }: AppContext) {
    this.userRepository = repositories.userRepository;
  }

  async getUserById(userId: string) {
    try {
      return await this.userRepository.getOneById(userId);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getUsers() {
    try {
      return await this.userRepository.getAll();
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async createUser(user: UserModel) {
    try {
      const Item = await this.userRepository.create(user);
      return Item;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateUser(userId: string, user: UserModel) {
    try {
      return await this.userRepository.update(userId, user);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async deleteUser(userId: string) {
    try {
      return await this.userRepository.delete(userId);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getUserByEmail(email: string) {
    try {
      return await this.userRepository.getOneByEmail(email);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getUserByUsername(username: string) {
    try {
      return await this.userRepository.getOneByUsername(username);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getUserByUsernameOrEmail(usernameOrEmail: string) {
    try {
      return await this.userRepository.getOneByUsernameOrEmail(
        usernameOrEmail
      );
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getUserByUsernameOrEmailAndPassword(usernameOrEmail: string, password: string) {
    try {
      return await this.userRepository.getOneByUsernameOrEmailAndPassword(
        usernameOrEmail,
        password
      );
    } catch (error: any) {
      throw new Error(error);
    }
  }
};
