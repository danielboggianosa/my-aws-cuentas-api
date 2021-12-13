export class DtoMapper<T, K> {
    public toDto(entity: T): K {
        return <K><unknown>(entity)
    }

    public toEntity(dto: K): T {
        return <T><unknown>(dto)
    }

    public toDtoArray(entities: T[]): K[] {
        return entities.map(entity => this.toDto(entity))
    }

    public toEntityArray(dtos: K[]): T[] {
        return dtos.map(dto => this.toEntity(dto))
    }

}