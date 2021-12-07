import { CategoriaModel } from "../../domain/models/categoriaModel";
import ICategoriaRepository from "../../domain/repositories/ICategoriaRepository";
import { AppContext } from "../../infrastructure/config/AppContext";

export default class CategoriaUseCases {
    categoriasRepository: ICategoriaRepository;
    constructor({ repositories }: AppContext) {
        this.categoriasRepository = repositories.categoriaRepository;
    }

    async getCategoriasByCuentaId(cuentaId: string) {
        try {
            return await this.categoriasRepository.getAllByCuentaId(cuentaId);
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

    async updateCategoria(categoriaId: string, categoria: CategoriaModel) {
        try {
            return await this.categoriasRepository.update(categoriaId, categoria);
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
