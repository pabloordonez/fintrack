import './EditionActionBar.scss';
import React, { ReactElement, PropsWithChildren } from 'react';
import { useHistory } from 'react-router-dom';

interface EditionActionBarProps
{
    onSave: () => void;
    onRemove: () => void;
}

export function EditionActionBar(props: PropsWithChildren<EditionActionBarProps>): ReactElement
{
    const history = useHistory();

    function save() {
        props.onSave();
        history.goBack();
    }

    function remove() {
        props.onRemove();
        history.goBack();
    }

    function goBack() {
        history.goBack();
    }

    return (
        <div className='edition-action-bar'>
            <div className='entity-actions'>
                <button onClick={save}><i className='ms-Icon ms-Icon--Save' /> Save</button>
                <button onClick={remove} className='delete'><i className='ms-Icon ms-Icon--Delete' /> Delete</button>
            </div>
            <button onClick={goBack} className='transparent'><i className='ms-Icon ms-Icon--GoBack' />Go Back</button>
        </div>
    );
}
