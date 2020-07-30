import { Injectable, DependencyLifeTime } from '@miracledevs/paradigm-web-di';
import { ContextCollection } from '../contexts/DependencyContext';

@Injectable({ collection: ContextCollection, lifeTime: DependencyLifeTime.Singleton })
export class TestService
{
    constructor()
    {
        console.log('Instancing test service...');
    }

    getValues(): number[]
    {
        return [1, 2, 3, 4, 5];
    }
}
