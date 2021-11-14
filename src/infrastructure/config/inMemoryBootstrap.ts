"use strict";

import UserRepository from "../repositories/inMemory/userRepository";
import CuentasRepository from "../repositories/inMemory/cuentasRepository";
import inMemoryDbClient, { IInMemoryDbClient } from "../repositories/inMemory/inMemoryDbClient";


class AppContext {
  private userRepository: UserRepository;
  private cuentasRepository: CuentasRepository;
  public repositories: any;

  constructor(dbClient: IInMemoryDbClient) {
    this.userRepository = new UserRepository(dbClient);
    this.cuentasRepository = new CuentasRepository(dbClient);

    this.repositories = {
      userRepository: this.userRepository,
      cuentasRepository: this.cuentasRepository
    }
  };
}
const appContext = new AppContext(inMemoryDbClient).repositories;

export default appContext;