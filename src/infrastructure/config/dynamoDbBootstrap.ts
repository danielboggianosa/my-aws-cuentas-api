"use strict";

import UserRepository from '../repositories/dynamoDB/userRepository'
import CuentasRepository from '../repositories/dynamoDB/cuentasRepository';
import dynamoDbClient from "../repositories/dynamoDB/dynamoDbClient";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

class AppContext {
  private userRepository: UserRepository;
  private cuentasRepository: CuentasRepository;
  public repositories: any;

  constructor(dbClient: DocumentClient) {
    this.userRepository = new UserRepository(dbClient);
    this.cuentasRepository = new CuentasRepository(dbClient);

    this.repositories = {
      userRepository: this.userRepository,
      cuentasRepository: this.cuentasRepository
    }
  };
}
const appContext = new AppContext(dynamoDbClient).repositories;

export default appContext;