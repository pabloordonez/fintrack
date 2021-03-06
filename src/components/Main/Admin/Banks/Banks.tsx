import './Banks.scss';
import React, { ReactElement, PropsWithChildren, useState } from 'react';
import { Page } from '../../../Shared/Page/Page';
import { Card } from '../../../Shared/Card/Card';
import { useDependency } from '../../../../contexts/DependencyContext';
import { BankRepositoryService } from '../../../../services/repositories/BankRepositoryService';
import { useHistory } from 'react-router-dom';
import { BankList } from './BankList/BankList';
import { IBank } from '../../../../models/Bank';
import { withAsyncContent } from '../../../../hooks/UseAsyncCall';
import { ConfirmModal } from '../../../Shared/Modals/ConfirmModal/ConfirmModal';
import { showModal } from '../../../../hooks/UseModal';
import { Guid } from '../../../../types/Guid';

type Selection = { [key: string]: boolean };

export function Banks(props: PropsWithChildren<{ banks: IBank[] }>): ReactElement
{
    const history = useHistory();
    const repository = useDependency(BankRepositoryService);
    const AsyncBankList = withAsyncContent(BankList, { onAdd: add, onEdit: edit, onRemove: remove }, load);
    const [, setRefresh] = useState('');

    async function load(): Promise<IBank[]>
    {
        return await repository.getAll();
    }

    async function add(): Promise<void>
    {
        history.push(`/admin/banks/new`);
    }

    async function edit(bank: IBank): Promise<void>
    {
        history.push(`/admin/banks/${bank.id}`);
    }

    async function remove(ids: string[]): Promise<void>
    {
        const result = await showModal(ConfirmModal, { title: 'Remove Banks', content: 'Are you sure you want to remove the banks?' });

        if (result)
        {
            for (const id of ids)
            {
                await repository.remove(id);
            }

            setRefresh(Guid.new().value);
        }
    }

    return (
        <Page>
            <Card>
                <h1>Banks</h1>
                <AsyncBankList />
            </Card>
        </Page>
    );
}
