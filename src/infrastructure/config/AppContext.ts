"use strict";

import UserRepository from '../repositories/dynamoDB/userRepository'
import CuentasRepository from '../repositories/dynamoDB/cuentasRepository';
import IUserRepository from '../../domain/repositories/IUserRepository';
import ICuentasRepository from '../../domain/repositories/ICuentasRepository';
import ICategoriaRepository from '../../domain/repositories/ICategoriaRepository';
import CategoriaRepository from '../repositories/dynamoDB/categoriaRepository';
import EmpresaRepository from '../repositories/dynamoDB/empresaRepository';
import IEmpresaRepository from '../../domain/repositories/IEmpresaRepository';
import IRegistroRepository from '../../domain/repositories/IRegistroRepository';
import ISubcategoriaRepository from '../../domain/repositories/ISubcategoriaRepository';
import RegistroRepository from '../repositories/dynamoDB/registroRepository';
import SubcategoriaRepository from '../repositories/dynamoDB/subcategoriaRepository';

export class AppContext {
  private categoriaRepository: ICategoriaRepository
  private cuentasRepository: ICuentasRepository;
  private empresaRepository: IEmpresaRepository;
  private registroRepository: IRegistroRepository;
  private subcategoriaRepository: ISubcategoriaRepository;
  private userRepository: IUserRepository;
  public repositories: any;

  constructor() {
    this.categoriaRepository = new CategoriaRepository();
    this.cuentasRepository = new CuentasRepository();
    this.empresaRepository = new EmpresaRepository();
    this.registroRepository = new RegistroRepository();
    this.subcategoriaRepository = new SubcategoriaRepository();
    this.userRepository = new UserRepository();

    this.repositories = {
      cuentasRepository: this.cuentasRepository,
      categoriaRepository: this.categoriaRepository,
      empresaRepository: this.empresaRepository,
      registroRepository: this.registroRepository,
      subcategoriaRepository: this.subcategoriaRepository,
      userRepository: this.userRepository,
    }
  };
}