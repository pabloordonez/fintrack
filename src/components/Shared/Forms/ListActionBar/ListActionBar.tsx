import './ListActionBar.scss';
import React, { ReactElement, PropsWithChildren } from 'react';

interface ListActionBarProps
{
    disabled?: boolean;
    onNew: () => void;
}

export function ListActionBar(props: PropsWithChildren<ListActionBarProps>): ReactElement
{
    function newItem(): void {
        props.onNew();
    }

    return (
        <div className='list-action-bar'>
            <button onClick={newItem} disabled={props.disabled}><i className='ms-Icon ms-Icon--AddNew'/> Add New</button>
            {props.children}
        </div>
    );
}
