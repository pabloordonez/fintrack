import { Guid } from '../types/Guid';

export interface IMovement
{
    id: string;
    conceptId?: string;
    date: Date;
    branch: string;
    description: string;
    referenceNumber: string;
    savingsAccount: number;
    currentAccount: number;
    balance: number;
}

export class Movement implements IMovement
{
    id: string;
    conceptId?: string;
    date: Date;
    branch: string;
    description: string;
    referenceNumber: string;
    savingsAccount: number;
    currentAccount: number;
    balance: number;

    constructor()
    {
        this.id = Guid.new().value;
        this.date = new Date();
        this.branch = '';
        this.description = '';
        this.referenceNumber = '';
        this.savingsAccount = 0;
        this.currentAccount = 0;
        this.balance = 0;
    }

    static fromInterface(movement: IMovement): Movement
    {
        const newInstance = new Movement();
        newInstance.id = movement.id;
        newInstance.conceptId = movement.conceptId;
        newInstance.date = movement.date;
        newInstance.branch = movement.branch;
        newInstance.description = movement.description;
        newInstance.referenceNumber = movement.referenceNumber;
        newInstance.savingsAccount = movement.savingsAccount;
        newInstance.currentAccount = movement.currentAccount;
        newInstance.balance = movement.balance;
        return newInstance;
    }
}

