import { Guid } from '../types/Guid';
import { Movement } from './Movement';

export interface IBank
{
    id: string;
    name: string;
    description: string;
    csvColumns: string[];
}

export class Bank implements IBank
{
    id: string;
    name: string;
    description: string;
    csvColumns: string[];

    constructor()
    {
        this.id = Guid.new().value;
        this.name = 'Untitled Bank';
        this.description = '';
        this.csvColumns = [];
    }

    static fromInterface(bank: IBank): Bank
    {
        const newInstance = new Bank();
        newInstance.id = bank.id;
        newInstance.name = bank.name;
        newInstance.description = bank.description;
        newInstance.csvColumns = bank.csvColumns;
        return newInstance;
    }

    addColumn(columnName: string): boolean
    {
        if (this.validateColumnName(columnName))
            return false;

        this.csvColumns.push(columnName);
        return true;
    }

    removeColumn(columnName: string): boolean
    {
        const index = this.csvColumns.indexOf(columnName);

        if (index < 0)
            return false;

        this.csvColumns.splice(index, 1);
        return true;
    }

    private validateColumnName(columnName: string): boolean
    {
        const temporalMovement = new Movement();
        return temporalMovement.hasOwnProperty(columnName);
    }
}
