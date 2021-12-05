import { CategoriaModel } from "../models/categoriaModel";

export default interface ICategoriaRepository {
    getAllByCuentaId(cuentaId: string): Promise<CategoriaModel[]>;
    getById(categoriaId: string): Promise<CategoriaModel>;
    create(categoria: CategoriaModel): Promise<CategoriaModel>;
    update(categoriaId: string, categoria: CategoriaModel): Promise<CategoriaModel>;
    delete(categoriaId: string): Promise<boolean>;
}