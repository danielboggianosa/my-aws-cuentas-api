import { CategoriaModel } from "../models/categoriaModel";

export interface ICategoriaRepository {
    getAll(): Promise<CategoriaModel[]>;
    getById(categoriaId: string): Promise<CategoriaModel>;
    create(categoria: CategoriaModel): Promise<CategoriaModel>;
    update(categoria: CategoriaModel): Promise<CategoriaModel>;
    delete(categoriaId: string): Promise<void>;
}