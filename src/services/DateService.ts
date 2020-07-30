import { StringService } from './StringService';
import { Injectable, DependencyLifeTime } from '@miracledevs/paradigm-web-di';
import { ContextCollection } from '../contexts/DependencyContext';

@Injectable({ collection: ContextCollection, lifeTime: DependencyLifeTime.Singleton })
export class DateService
{
    constructor(private readonly stringService: StringService)
    {
    }

    getNextWeekDay(date: Date, dayOfWeek: DayOfWeek): Date
    {
        const from = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const daysUntil = (dayOfWeek - from.getDay() + 7) % 7;

        return this.addDays(from, daysUntil);
    }

    getPreviousWeekDay(date: Date, dayOfWeek: DayOfWeek): Date
    {
        const from = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const daysUntil = (from.getDay() - dayOfWeek + 7) % 7;

        return this.addDays(from, -daysUntil);
    }

    getTwoDigitYear(date: Date): string
    {
        const year = date.getFullYear();

        return (year < 0)
            ? '-' + this.getTwoDigit(Math.abs(year))
            : this.getTwoDigit(year);
    }

    getTwoDigitUTCYear(date: Date): string
    {
        const year = date.getUTCFullYear();

        return (year < 0)
            ? '-' + this.getTwoDigit(Math.abs(year))
            : this.getTwoDigit(year);
    }

    format(date: Date, format: string): string
    {
        // TODO: replace with a fast parser.
        return format
            .replace(/yyyy/g, date.getFullYear().toString())
            .replace(/yy/g, this.getTwoDigitYear(date))

            .replace(/MM/g, this.stringService.padRight((date.getMonth() + 1).toString(), 2, '0'))
            .replace(/M/g, (date.getMonth() + 1).toString())

            .replace(/dd/g, this.stringService.padRight(date.getDate().toString(), 2, '0'))
            .replace(/d/g, date.getDate().toString())

            .replace(/ww/g, this.stringService.padRight(date.getDay().toString(), 2, '0'))
            .replace(/w/g, date.getDay().toString())

            .replace(/hh/g, this.stringService.padRight(date.getHours().toString(), 2, '0'))
            .replace(/h/g, date.getHours().toString())

            .replace(/mm/g, this.stringService.padRight(date.getMinutes().toString(), 2, '0'))
            .replace(/m/g, date.getMinutes().toString())

            .replace(/ss/g, this.stringService.padRight(date.getSeconds().toString(), 2, '0'))
            .replace(/s/g, date.getSeconds().toString())

            .replace(/fff/g, this.stringService.padRight(date.getMilliseconds().toString(), 3, '0'))
            .replace(/ff/g, this.stringService.padRight(date.getMilliseconds().toString(), 2, '0'))
            .replace(/f/g, date.getMilliseconds().toString());
    }

    formatUTC(date: Date, format: string): string
    {
        // TODO: replace with a fast parser.
        return format
            .replace(/yyyy/g, date.getUTCFullYear().toString())
            .replace(/yy/g, this.getTwoDigitUTCYear(date))

            .replace(/MM/g, this.stringService.padRight((date.getUTCMonth() + 1).toString(), 2, '0'))
            .replace(/M/g, (date.getUTCMonth() + 1).toString())

            .replace(/dd/g, this.stringService.padRight(date.getUTCDate().toString(), 2, '0'))
            .replace(/d/g, date.getUTCDate().toString())

            .replace(/ww/g, this.stringService.padRight(date.getUTCDay().toString(), 2, '0'))
            .replace(/w/g, date.getUTCDay().toString())

            .replace(/hh/g, this.stringService.padRight(date.getUTCHours().toString(), 2, '0'))
            .replace(/h/g, date.getUTCHours().toString())

            .replace(/mm/g, this.stringService.padRight(date.getUTCMinutes().toString(), 2, '0'))
            .replace(/m/g, date.getUTCMinutes().toString())

            .replace(/ss/g, this.stringService.padRight(date.getUTCSeconds().toString(), 2, '0'))
            .replace(/s/g, date.getUTCSeconds().toString())

            .replace(/fff/g, this.stringService.padRight(date.getUTCMilliseconds().toString(), 3, '0'))
            .replace(/ff/g, this.stringService.padRight(date.getUTCMilliseconds().toString(), 2, '0'))
            .replace(/f/g, date.getUTCMilliseconds().toString());
    }

    addMilliseconds(date: Date, ms: number): Date
    {
        date = new Date(date.valueOf());
        date.setMilliseconds(date.getMilliseconds() + ms);
        return date;
    }

    addSeconds(date: Date, seconds: number): Date
    {
        date = new Date(date.valueOf());
        date.setSeconds(date.getSeconds() + seconds);
        return date;
    }

    addMinutes(date: Date, minutes: number): Date
    {
        date = new Date(date.valueOf());
        date.setMinutes(date.getMinutes() + minutes);
        return date;
    }

    addHours(date: Date, hours: number): Date
    {
        date = new Date(date.valueOf());
        date.setHours(date.getHours() + hours);
        return date;
    }

    addDays(date: Date, days: number): Date
    {
        date = new Date(date.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    addMonths(date: Date, months: number): Date
    {
        date = new Date(date.valueOf());
        date.setMonth(date.getMonth() + months);
        return date;
    }

    addYears(date: Date, years: number): Date
    {
        date = new Date(date.valueOf());
        date.setFullYear(date.getFullYear() + years);
        return date;
    }

    private getTwoDigit(value: number): string
    {
        const str = value.toString();
        return (str.length < 2)
            ? this.stringService.padRight(str, 2, '0')
            : str.substr(str.length - 2, 2);
    }
}

export enum DayOfWeek
{
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
}
