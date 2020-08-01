import { Guid } from '../types/Guid';

export enum RuleType
{
    Contains,
    StartsWith,
    EndsWith,
    Equals,
    RegEx
}

export interface IRule
{
    id: string;
    type: RuleType;
    expression: string;
}

export class Rule implements IRule
{
    id: string;
    type: RuleType;
    expression: string;

    constructor()
    {
        this.id = Guid.new().value;
        this.type = RuleType.Contains;
        this.expression = '';
    }

    static fromInterface(rule: IRule): Rule
    {
        const newInstance = new Rule();
        newInstance.id = rule.id;
        newInstance.type = rule.type;
        newInstance.expression = rule.expression;
        return newInstance;
    }
}

