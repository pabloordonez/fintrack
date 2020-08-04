import { AsyncContentProps } from '../../../../../hooks/UseAsyncCall';
import { IBank } from '../../../../../models/Bank';
import React, { ReactElement, useState } from 'react';
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
    const [disabled, setDisabled] = useState(false);

    async function save(): Promise<void>
    {
        setDisabled(true);
        await props.onSave(bank).finally(() => setDisabled(false));
    }

    async function remove(): Promise<void>
    {
        setDisabled(true);
        await props.onRemove(bank).finally(() => setDisabled(false));
    }

    return (
        <>
            <EditionActionBar onSave={save} onRemove={remove} disabled={disabled} />
            <TextField name='Name' object={bank} field='name' />
            <TextField name='Description' object={bank} field='description' />
        </>
    );
}
