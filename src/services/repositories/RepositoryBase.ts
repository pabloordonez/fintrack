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

    async add(model: TModel): Promise<void>
    {
        const table = await this.openTable();

        if (table.hasOwnProperty(model.id))
            throw new Error(`An entity with the same id already exists in table ${this.tableName}.`);

        table[model.id] = model;
        await this.saveTable(table);
    }

    async update(model: TModel): Promise<void>
    {
        const table = await this.openTable();

        if (!table.hasOwnProperty(model.id))
            throw new Error(`Unable to update an entity with id '${model.id}' in table ${this.tableName}.`);

        table[model.id] = model;
        await this.saveTable(table);
    }

    async save(model: TModel): Promise<void>
    {
        const table = await this.openTable();
        table[model.id] = model;
        await this.saveTable(table);
    }

    async get(id: string): Promise<TModel>
    {
        return (await this.openTable())[id];
    }

    async getAll(): Promise<TModel[]>
    {
        const table = await this.openTable();
        return Object.values(table);
    }

    async remove(id: string): Promise<void>
    {
        const table = await this.openTable();

        if (!table.hasOwnProperty(id))
            throw new Error(`Unable to delete an entity with id '${id}' in table ${this.tableName}.`);

        delete table[id];
        await this.saveTable(table);
    }

    async find(action: (model: TModel) => boolean): Promise<TModel[]>
    {
        const table = await this.openTable();
        const models = Object.values(table);

        return models.filter(action);
    }

    protected async openTable(): Promise<Table<TModel>>
    {
        await this.delay(100);
        return this.localStorage.getJson(this.tableName);
    }

    protected async saveTable(table: Table<TModel>): Promise<void>
    {
        await this.delay(100);
        return this.localStorage.setJson(this.tableName, table);
    }

    private delay(time: number): Promise<void> {
        return new Promise(r => setTimeout(() => r(), time));
    }}
