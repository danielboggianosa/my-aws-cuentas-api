import { SubcategoriaModel } from "../models/subcategoriaModel";

export default interface ISubcategoriaRepository {
    getAllByCategoriaId(categoriaId: string): Promise<SubcategoriaModel[]>;
    getById(subcategoriaId: string): Promise<SubcategoriaModel>;
    create(subcategoria: SubcategoriaModel): Promise<SubcategoriaModel>;
    update(subcategoriaId: string, subcategoria: SubcategoriaModel): Promise<SubcategoriaModel>;
    delete(subcategoriaId: string): Promise<boolean>;
}