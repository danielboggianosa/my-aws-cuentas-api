export interface RegistroModel {
    registroId: string;
    cuentaId: string;
    fecha: Date;
    monto: number;
    categoriaId: string;
    subcategoriaId: string;
    descripcion: string;
    entidad: string;
    imagenUrl: string;
    operacion: string;
}