import './BankEditor.scss';
import React, { ReactElement } from 'react';
import { Page } from '../../../Shared/Page/Page';
import { Card } from '../../../Shared/Card/Card';
import { useDependency } from '../../../../contexts/DependencyContext';
import { BankRepositoryService } from '../../../../services/repositories/BankRepositoryService';
import { LoggingService } from '../../../../services/logging/LoggingService';
import { RouteComponentProps } from 'react-router-dom';
import { Bank } from '../../../../models/Bank';
import { TextField } from '../../../Shared/Forms/TextField/TextField';
import { EditionActionBar } from '../../../Shared/Forms/EditionActionBar/EditionActionBar';

interface BankEditorParameters
{
    id: string;
}

export function BankEditor(props: RouteComponentProps<BankEditorParameters>): ReactElement
{
    const logger = useDependency(LoggingService);
    const repository = useDependency(BankRepositoryService);
    const isNew = props.match.params.id === 'new';
    const bank = isNew
        ? new Bank()
        : Bank.fromInterface(repository.get(props.match.params.id));

    logger.debug(`Got bank '${bank.name}'.`);

    function save(): void
    {
        repository.save(bank);
        logger.debug(`Bank '${bank.name}' saved.`);
    }

    function remove(): void
    {
        repository.remove(bank.id);
        logger.debug(`Bank '${bank.name}' removed.`);
    }

    return (
        <Page>
            <Card>
                <h1>{bank.name}</h1>
                <EditionActionBar onSave={save} onRemove={remove} />
                <TextField name='Name' object={bank} field='name' />
                <TextField name='Description' object={bank} field='description' />
            </Card>
        </Page>
    );
}