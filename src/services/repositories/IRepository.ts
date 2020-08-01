
export interface IRepository<TModel extends { id: string }>
{
    add(model: TModel): void;
    update(model: TModel): void;
    save(model: TModel): void;
    get(id: string): TModel;
    getAll(): TModel[];
    remove(id: string): void;
    find(action: (model: TModel) => boolean): TModel[];
}
