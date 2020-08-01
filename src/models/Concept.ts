import { Rule, IRule, RuleType } from './Rule';
import { Guid } from '../types/Guid';
import { Movement } from './Movement';

export interface IConcept
{
    id: string;
    name: string;
    description: string;
    rules: Rule[];
}

export class Concept implements IConcept
{
    id: string;
    name: string;
    description: string;
    rules: Rule[];

    constructor()
    {
        this.id = Guid.new().value;
        this.name = '';
        this.description = '';
        this.rules = [];
    }

    fromInterface(concept: IConcept): Concept
    {
        const newInstance = new Concept();
        newInstance.id = concept.id;
        newInstance.name = concept.name;
        newInstance.description = concept.description;
        newInstance.rules = concept.rules.map(x => Rule.fromInterface(x));
        return newInstance;
    }

    addRule(rule: IRule): boolean
    {
        this.rules.push(rule);
        return true;
    }

    removeRule(id: string): boolean
    {
        const rule = this.rules.find(x => x.id === id);

        if (!rule)
            return false;

        this.rules.splice(this.rules.indexOf(rule), 1);
        return true;
    }

    match(movement: Movement): boolean
    {
        for (const rule of this.rules)
        {
            if (rule.type === RuleType.Contains && !movement.description.includes(rule.expression))
                return false;

            else if (rule.type === RuleType.StartsWith && !movement.description.startsWith(rule.expression))
                return false;

            else if (rule.type === RuleType.EndsWith && !movement.description.endsWith(rule.expression))
                return false;

            else if (rule.type === RuleType.Equals && movement.description !== rule.expression)
                return false;

            else if (rule.type === RuleType.RegEx && !new RegExp(rule.expression).test(movement.description))
                return false;
        }

        return true;
    }
}
