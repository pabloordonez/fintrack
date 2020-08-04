import './BankList.scss';
import React, { ReactElement, useState } from 'react';
import { ActionableLink } from '../../../../Shared/Forms/ActionableLink/ActionableLink';
import { CheckBox } from '../../../../Shared/Forms/CheckBox/CheckBox';
import { IBank } from '../../../../../models/Bank';
import { ListActionBar } from '../../../../Shared/Forms/ListActionBar/ListActionBar';
import { useListSelection } from '../../../../../hooks/UseListSelection';
import { AsyncContentProps } from '../../../../../hooks/UseAsyncCall';

interface BankListProps
{
    onEdit: (bank: IBank) => Promise<void>;
    onAdd: () => Promise<void>;
    onRemove: (ids: string[]) => Promise<void>;
}

export function BankList(props: AsyncContentProps<BankListProps, IBank[]>): ReactElement
{
    const [selectedIds, select] = useListSelection();
    const [disabled, setDisabled] = useState(false);
    const selected = selectedIds.length > 0;

    async function add(): Promise<void>
    {
        setDisabled(true);
        await props.onAdd().finally(() => setDisabled(false));
    }

    async function edit(bank: IBank): Promise<void>
    {
        setDisabled(true);
        await props.onEdit(bank).finally(() => setDisabled(false));
    }

    async function remove(): Promise<void>
    {
        setDisabled(true);
        await props.onRemove(selectedIds).finally(() => setDisabled(false));
    }

    return (
        <>
            <ListActionBar onNew={add} disabled={disabled}>
                {
                    selected &&
                    <button onClick={remove} className='delete' disabled={disabled}>
                        <i className='ms-Icon ms-Icon--Delete' /> Delete
                    </button>
                }
            </ListActionBar>

            {(props.content && props.content.length > 0)
                ? <table>
                    <thead>
                        <tr>
                            <td style={{ width: '20px' }}></td>
                            <td>Name</td>
                            <td>Description</td>
                        </tr>
                    </thead>
                    <tbody>
                        {props.content.map(bank => (
                            <tr key={bank.id} onClick={() => edit(bank)}>
                                <td onClick={e => e.stopPropagation()}><CheckBox name='Selected' onChange={x => select(bank, x)} /></td>
                                <td>{bank.name}</td>
                                <td>{bank.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                : <span>There are no banks yet. Try to <ActionableLink onClick={add}>add a new one</ActionableLink>.</span>}
        </>);
}
