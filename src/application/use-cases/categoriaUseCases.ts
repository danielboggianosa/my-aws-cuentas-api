import { CategoriaModel } from "../../domain/models/categoriaModel";
import { ICategoriaRepository } from "../../domain/repositories/ICategoriaRepository";
import { AppContext } from "../../infrastructure/config/AppContext";

export default class CategoriaUseCases {
    categoriasRepository: ICategoriaRepository;
    constructor(appContext: AppContext) {
        this.categoriasRepository = appContext.repositories.categoriaRepository;
    }

    async getCategorias() {
        try {
            return await this.categoriasRepository.getAll();
        }
        catch (error: any) {
            throw new Error(error);
        }
    }

    async getCategoriaById(categoriaId: string) {
        try {
            return await this.categoriasRepository.getById(categoriaId);
        }
        catch (error: any) {
            throw new Error(error);
        }
    }

    async createCategoria(categoria: CategoriaModel) {
        try {
            return await this.categoriasRepository.create(categoria);
        }
        catch (error: any) {
            throw new Error(error);
        }
    }

    async updateCategoria(categoria: CategoriaModel) {
        try {
            return await this.categoriasRepository.update(categoria);
        }
        catch (error: any) {
            throw new Error(error);
        }
    }

    async deleteCategoria(categoriaId: string) {
        try {
            return await this.categoriasRepository.delete(categoriaId);
        }
        catch (error: any) {
            throw new Error(error);
        }
    }

}