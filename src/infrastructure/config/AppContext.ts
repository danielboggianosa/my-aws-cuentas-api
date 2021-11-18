"use strict";

import UserRepository from '../repositories/dynamoDB/userRepository'
import CuentasRepository from '../repositories/dynamoDB/cuentasRepository';
import IUserRepository from '../../domain/repositories/IUserRepository';
import ICuentasRepository from '../../domain/repositories/ICuentasRepository';

export class AppContext {
  private userRepository: IUserRepository;
  private cuentasRepository: ICuentasRepository;
  public repositories: any;

  constructor() {
    this.userRepository = new UserRepository();
    this.cuentasRepository = new CuentasRepository();

    this.repositories = {
      userRepository: this.userRepository,
      cuentasRepository: this.cuentasRepository
    }
  };
}