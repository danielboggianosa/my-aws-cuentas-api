import { SubcategoriaModel } from "../models/subcategoriaModel";

export interface ISubcategoriaRepository {
    getAllByCategoriaId(categoriaId: string): Promise<SubcategoriaModel[]>;
    getById(subcategoriaId: string): Promise<SubcategoriaModel>;
    create(subcategoria: SubcategoriaModel): Promise<SubcategoriaModel>;
    update(subcategoria: SubcategoriaModel): Promise<SubcategoriaModel>;
    delete(subcategoriaId: string): Promise<void>;
}