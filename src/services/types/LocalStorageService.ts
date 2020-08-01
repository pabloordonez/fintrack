import { Injectable, DependencyLifeTime } from '@miracledevs/paradigm-web-di';
import { ContextCollection } from '../../contexts/DependencyContext';

@Injectable({ collection: ContextCollection, lifeTime: DependencyLifeTime.Singleton })
export class LocalStorageService
{
    set(name: string, value: any): void
    {
        localStorage.setItem(name, value.toString());
    }

    setJson<T>(name: string, value: T): void
    {
        localStorage.setItem(name, JSON.stringify(value));
    }

    get(name: string): string
    {
        return localStorage.getItem(name) || '';
    }

    getJson<T>(name: string): T
    {
        return JSON.parse(this.get(name) || '{}') as T;
    }

    remove(name: string): void
    {
        localStorage.removeItem(name);
    }

    clear(): void
    {
        localStorage.clear();
    }
}
