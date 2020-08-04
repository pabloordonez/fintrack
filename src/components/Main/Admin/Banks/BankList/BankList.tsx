import './BankList.scss';
import React, { ReactElement, PropsWithChildren } from 'react';
import { ActionableLink } from '../../../../Shared/Forms/ActionableLink/ActionableLink';
import { CheckBox } from '../../../../Shared/Forms/CheckBox/CheckBox';
import { IBank } from '../../../../../models/Bank';
import { ListActionBar } from '../../../../Shared/Forms/ListActionBar/ListActionBar';
import { useListSelection } from '../../../../../hooks/UseListSelection';

interface BankListProps
{
    banks: IBank[];
    onEdit: (bank: IBank) => void;
    onAdd: () => void;
    onRemove: (ids: string[]) => void;
}

export function BankList(props: PropsWithChildren<BankListProps>): ReactElement
{
    const [selectedIds, select] = useListSelection();
    const selected = selectedIds.length > 0;

    return (
        <>
            <ListActionBar onNew={props.onAdd}>
                {
                    selected &&
                    <button onClick={() => props.onRemove(selectedIds)} className='delete'>
                        <i className='ms-Icon ms-Icon--Delete' /> Delete
                    </button>
                }
            </ListActionBar>

            {(props.banks && props.banks.length > 0)
                ? <table>
                    <thead>
                        <tr>
                            <td style={{ width: '20px' }}></td>
                            <td>Name</td>
                            <td>Description</td>
                        </tr>
                    </thead>
                    <tbody>
                        {props.banks.map(bank => (
                            <tr key={bank.id} onClick={() => props.onEdit(bank)}>
                                <td onClick={e => e.stopPropagation()}><CheckBox name='Selected' onChange={x => select(bank, x)} /></td>
                                <td>{bank.name}</td>
                                <td>{bank.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                : <span>There are no banks yet. Try to <ActionableLink onClick={props.onAdd}>add a new one</ActionableLink>.</span>}
        </>);
}
