import { SubcategoriaModel } from "../../domain/models/subcategoriaModel";
import { ISubcategoriaRepository } from "../../domain/repositories/ISubcategoriaRepository";
import { AppContext } from "../../infrastructure/config/AppContext";

export default class SubcategoriaUseCases {
    subcategoriaRepository: ISubcategoriaRepository;
    constructor(appContext: AppContext){
        this.subcategoriaRepository = appContext.repositories.subcategoriaRepository;
    }

    async getAllSubcategoryByCategoriaId(categoriaId: string){
        try {
            return await this.subcategoriaRepository.getAllByCategoriaId(categoriaId);
        } catch (error: any){
            throw new Error(error);
        }
    }

    async getSubcategoryById(subcategoriaId: string){
        try {
            return await this.subcategoriaRepository.getById(subcategoriaId);
        } catch (error: any){
            throw new Error(error);
        }
    }

    async createSubcategory(subcategoria: SubcategoriaModel){
        try {
            return await this.subcategoriaRepository.create(subcategoria);
        } catch (error: any){
            throw new Error(error);
        }
    }

    async updateSubcategory(subcategoria: SubcategoriaModel){
        try {
            return await this.subcategoriaRepository.update(subcategoria);
        } catch (error: any){
            throw new Error(error);
        }
    }

    async deleteSubcategory(subcategoriaId: string){
        try {
            return await this.subcategoriaRepository.delete(subcategoriaId);
        } catch (error: any){
            throw new Error(error);
        }
    }

}