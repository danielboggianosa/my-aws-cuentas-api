import IUserRepository from '../../domain/repositories/IUserRepository'
import { UserModel } from "../../domain/models/userModel";


export default class UserUseCases {
  userRepository: IUserRepository;

  constructor(appContext: any) {
    this.userRepository = appContext.default.userRepository;
  }

  async getUserById(userId: string) {
    try {
      return await this.userRepository.getUserById(userId);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getUsers() {
    try {
      return await this.userRepository.getUsers();
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async createUser(user: UserModel) {
    try {
      const Item =  await this.userRepository.createUser(user);
      return Item;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateUser(userId: string, user: UserModel) {
    try {
      return await this.userRepository.updateUser(userId, user);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async deleteUser(userId: string) {
    try {
      return await this.userRepository.deleteUser(userId);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getUserByEmail(email: string) {
    try {
      return await this.userRepository.getUserByEmail(email);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getUserByUsername(username: string) {
    try {
      return await this.userRepository.getUserByUsername(username);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getUserByUsernameOrEmail(usernameOrEmail: string) {
    try {
      return await this.userRepository.getUserByUsernameOrEmail(
        usernameOrEmail
      );
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getUserByUsernameOrEmailAndPassword(usernameOrEmail: string, password: string) {
    try {
      return await this.userRepository.getUserByUsernameOrEmailAndPassword(
        usernameOrEmail,
        password
      );
    } catch (error: any) {
      throw new Error(error);
    }
  }
};
