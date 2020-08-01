import { LocalStorageService } from '../types/LocalStorageService';
import { IRepository } from './IRepository';

export type Table<TModel> = { [id: string]: TModel };

export abstract class RepositoryBase<TModel extends { id: string; }> implements IRepository<TModel>
{
    constructor(
        private readonly localStorage: LocalStorageService,
        private readonly tableName: string
    )
    {
    }

    add(model: TModel): void
    {
        const table = this.openTable();

        if (table.hasOwnProperty(model.id))
            throw new Error(`An entity with the same id already exists in table ${this.tableName}.`);

        table[model.id] = model;
        this.saveTable(table);
    }

    update(model: TModel): void
    {
        const table = this.openTable();

        if (!table.hasOwnProperty(model.id))
            throw new Error(`Unable to update an entity with id '${model.id}' in table ${this.tableName}.`);

        table[model.id] = model;
        this.saveTable(table);
    }

    save(model: TModel): void
    {
        const table = this.openTable();
        table[model.id] = model;
        this.saveTable(table);
    }

    get(id: string): TModel
    {
        return this.openTable()[id];
    }

    getAll(): TModel[]
    {
        const table = this.openTable();
        return Object.values(table);
    }

    remove(id: string): void
    {
        const table = this.openTable();

        if (!table.hasOwnProperty(id))
            throw new Error(`Unable to delete an entity with id '${id}' in table ${this.tableName}.`);

        delete table[id];
        this.saveTable(table);
    }

    find(action: (model: TModel) => boolean): TModel[]
    {
        const table = this.openTable();
        const models = Object.values(table);

        return models.filter(action);
    }

    protected openTable(): Table<TModel>
    {
        return this.localStorage.getJson(this.tableName);
    }

    protected saveTable(table: Table<TModel>): void
    {
        return this.localStorage.setJson(this.tableName, table);
    }
}
