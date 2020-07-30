import { Injectable, DependencyLifeTime } from '@miracledevs/paradigm-web-di';
import { ContextCollection } from '../../contexts/DependencyContext';

@Injectable({ collection: ContextCollection, lifeTime: DependencyLifeTime.Singleton })
export class StringService
{
    padLeft(value: string, length: number, padChar: string): string
    {
        if (value === null || value === undefined)
            throw new Error('Value can not be null or undefined.');

        while (value.length < length)
        {
            value += padChar;
        }

        return value;
    }

    padRight(value: string, length: number, padChar: string): string
    {
        if (value === null || value === undefined)
            throw new Error('Value can not be null or undefined.');

        while (value.length < length)
        {
            value = padChar + value;
        }

        return value;
    }

    isString(value: any): boolean
    {
        return (typeof (value) === 'string' || value instanceof String);
    }

    isNullOrEmpty(value: string): boolean
    {
        return !value;
    }

    isNullOrWhiteSpace(value: string): boolean
    {
        if (!value)
            return true;

        for (const char of value)
        {
            if (char !== ' '){
                return false;
            }
        }

        return true;
    }

    format(format: string, ...args: any[]): string
    {
        if (!format)
            throw new Error('Format string can not be null or undefined.');

        return String(format).replace(/\{([0-9]+)\}/g, (match, index) =>
        {
            index = parseInt(index, 10);

            if (index < 0 || index >= args.length)
                throw new Error(`Index is zero based. Must be greater than 0 and less than ${args.length - 1}.`);

            const argument = args[index];
            return (!argument) ? '' : argument.toString();
        });
    }

    join(values: string[], separator: string = ','): string
    {
        if (!values)
            throw new Error('Values can not be null or undefined.');

        return values.reduce((p, c) => `${p}${separator}${c}`);
    }
}
