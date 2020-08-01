import { Injectable } from '@miracledevs/paradigm-web-di';
import { ContextCollection } from '../../contexts/DependencyContext';
import { LocalStorageService } from '../types/LocalStorageService';
import { RepositoryBase } from './RepositoryBase';
import { IBank } from '../../models/Bank';

@Injectable({ collection: ContextCollection })
export class BankRepositoryService extends RepositoryBase<IBank>
{
    constructor(localStorage: LocalStorageService)
    {
        super(localStorage, 'banks');
    }
}
