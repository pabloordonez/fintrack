import { AsyncContentProps } from '../../../../../hooks/UseAsyncCall';
import { IBank } from '../../../../../models/Bank';
import React, { ReactElement } from 'react';
import { TextField } from '../../../../Shared/Forms/TextField/TextField';
import { EditionActionBar } from '../../../../Shared/Forms/EditionActionBar/EditionActionBar';

export interface BankFormProps
{
    onSave: (bank: IBank) => Promise<void>;
    onRemove: (bank: IBank) => Promise<void>;
}

export function BankForm(props: AsyncContentProps<BankFormProps, IBank>): ReactElement
{
    const bank = props.content;

    async function save(): Promise<void>
    {
        await props.onSave(bank);
    }

    async function remove(): Promise<void>
    {
        await props.onRemove(bank);
    }

    return (
        <>
            <EditionActionBar onSave={save} onRemove={remove} />
            <TextField name='Name' object={bank} field='name' />
            <TextField name='Description' object={bank} field='description' />
        </>
    );
}
