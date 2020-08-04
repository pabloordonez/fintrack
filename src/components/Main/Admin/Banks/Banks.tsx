import './Banks.scss';
import React, { ReactElement, useState, useEffect } from 'react';
import { Page } from '../../../Shared/Page/Page';
import { Card } from '../../../Shared/Card/Card';
import { useDependency } from '../../../../contexts/DependencyContext';
import { BankRepositoryService } from '../../../../services/repositories/BankRepositoryService';
import { useHistory } from 'react-router-dom';
import { BankList } from './BankList/BankList';
import { IBank } from '../../../../models/Bank';

type Selection = { [key: string]: boolean };

export function Banks(): ReactElement
{
    const history = useHistory();
    const repository = useDependency(BankRepositoryService);
    const [banks, setBanks] = useState([] as IBank[]);

    useEffect(() => { setTimeout(() => setBanks(repository.getAll())); }, [repository]);

    function add(): void
    {
        history.push(`/admin/banks/new`);
    }

    function edit(bank: IBank): void
    {
        history.push(`/admin/banks/${bank.id}`);
    }

    function remove(ids: string[]): void
    {
        for (const id of ids)
        {
            repository.remove(id);
        }

        setBanks([]);
    }

    return (
        <Page>
            <Card>
                <h1>Banks</h1>
                <BankList banks={banks} onAdd={add} onEdit={edit} onRemove={remove} />
            </Card>
        </Page>
    );
}
