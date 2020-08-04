import './EditionActionBar.scss';
import React, { ReactElement, PropsWithChildren } from 'react';
import { useHistory } from 'react-router-dom';

interface EditionActionBarProps
{
    disabled?: boolean;
    onSave: () => Promise<void> | void;
    onRemove: () => Promise<void> | void;
}

export function EditionActionBar(props: PropsWithChildren<EditionActionBarProps>): ReactElement
{
    const history = useHistory();

    async function save(): Promise<void> {
        await props.onSave();
    }

    async function remove(): Promise<void> {
        await props.onRemove();
    }

    function goBack(): void {
        history.goBack();
    }

    return (
        <div className='edition-action-bar'>
            <div className='entity-actions'>
                <button disabled={props.disabled} onClick={save}><i className='ms-Icon ms-Icon--Save' /> Save</button>
                <button disabled={props.disabled} onClick={remove} className='delete'><i className='ms-Icon ms-Icon--Delete' /> Delete</button>
            </div>
            <button disabled={props.disabled} onClick={goBack} className='transparent'><i className='ms-Icon ms-Icon--GoBack' />Go Back</button>
        </div>
    );
}
