"use strict";

module.exports = class UserUseCases {
  constructor(appContext) {
    this.appContext = appContext;
    this.userRepository = appContext.userRepository;
    this.userService = appContext.userService;
  }

  async getUser(userId) {
    try {
      return await this.userRepository.getUser(userId);
    } catch (error) {
      throw new TypeError("UserId no está definido");
    }
  }

  async getUsers() {
    try {
      return await this.userRepository.getUsers();
    } catch (error) {
      throw new TypeError("No se pudo obtener los usuarios");
    }
  }

  async createUser(user) {
    try {
      return await this.userService.createUser(user);
    } catch (error) {
      throw new TypeError("No se pudo crear el usuario");
    }
  }

  async updateUser(userId, user) {
    try {
      return await this.userService.updateUser(userId, user);
    } catch (error) {
      throw new TypeError("No se pudo actualizar el usuario");
    }
  }

  async deleteUser(userId) {
    try {
      return await this.userService.deleteUser(userId);
    } catch (error) {
      throw new TypeError("No se pudo eliminar el usuario");
    }
  }

  async getUserByEmail(email) {
    try {
      return await this.userRepository.getUserByEmail(email);
    } catch (error) {
      throw new TypeError("No se pudo obtener el usuario");
    }
  }

  async getUserByUsername(username) {
    try {
      return await this.userRepository.getUserByUsername(username);
    } catch (error) {
      throw new TypeError("No se pudo obtener el usuario");
    }
  }

  async getUserByUsernameOrEmail(usernameOrEmail) {
    try {
      return await this.userRepository.getUserByUsernameOrEmail(
        usernameOrEmail
      );
    } catch (error) {
      throw new TypeError("No se pudo obtener el usuario");
    }
  }

  async getUserByUsernameOrEmailAndPassword(usernameOrEmail, password) {
    try {
      return await this.userRepository.getUserByUsernameOrEmailAndPassword(
        usernameOrEmail,
        password
      );
    } catch (error) {
      throw new TypeError("No se pudo obtener el usuario");
    }
  }
};
