import './BankEditor.scss';
import React, { ReactElement } from 'react';
import { Page } from '../../../Shared/Page/Page';
import { Card } from '../../../Shared/Card/Card';
import { useDependency } from '../../../../contexts/DependencyContext';
import { BankRepositoryService } from '../../../../services/repositories/BankRepositoryService';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { Bank, IBank } from '../../../../models/Bank';
import { withAsyncContent } from '../../../../hooks/UseAsyncCall';
import { BankForm } from './BankForm/BankForm';
import { showModal } from '../../../../hooks/UseModal';
import { ConfirmModal } from '../../../Shared/Modals/ConfirmModal/ConfirmModal';

interface BankEditorParameters
{
    id: string;
}

export function BankEditor(props: RouteComponentProps<BankEditorParameters>): ReactElement
{
    const history = useHistory();
    const repository = useDependency(BankRepositoryService);
    const isNew = props.match.params.id === 'new';
    const AsyncBankForm = withAsyncContent(BankForm, { onSave: save, onRemove: remove }, load);

    async function load(): Promise<IBank>
    {
        return isNew ? new Bank() : Bank.fromInterface(await repository.get(props.match.params.id));
    }

    async function save(bank: IBank): Promise<void>
    {
        await repository.save(bank);
        history.goBack();
    }

    async function remove(bank: IBank): Promise<void>
    {
        const result = await showModal(ConfirmModal, { title: 'Remove Bank', content: 'Are you sure you want to remove the bank?' });

        if (result)
        {
            await repository.remove(bank.id);
            history.goBack();
        }
    }

    return (
        <Page>
            <Card>
                <h1>{isNew ? 'New Bank' : 'Edit Bank'}</h1>
                <AsyncBankForm />
            </Card>
        </Page>
    );
}
