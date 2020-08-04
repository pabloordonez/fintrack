
export interface IRepository<TModel extends { id: string }>
{
    add(model: TModel): Promise<void>;
    update(model: TModel): Promise<void>;
    save(model: TModel): Promise<void>;
    get(id: string): Promise<TModel>;
    getAll(): Promise<TModel[]>;
    remove(id: string): Promise<void>;
    find(action: (model: TModel) => boolean): Promise<TModel[]>;
}
