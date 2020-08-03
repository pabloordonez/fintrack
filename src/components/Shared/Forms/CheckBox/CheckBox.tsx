import './CheckBox.scss';
import React, { ReactElement, PropsWithChildren, useState, ChangeEvent, MouseEvent } from 'react';

interface CheckBoxProps
{
    name: string;
    preventDefault?: boolean;
    stopPropagation?: boolean;
    onChange?: (selected: boolean) => void;
    object?: any;
    field?: string;
}

export function CheckBox(props: PropsWithChildren<CheckBoxProps>): ReactElement
{
    const initialValue = (props.object && props.field) ? props.object[props.field] as boolean : false;
    const [value, setValue] = useState(initialValue);

    function onChange(event: ChangeEvent<HTMLInputElement>): void
    {
        if (props.object && props.field)
        {
            props.object[props.field] = event.target.checked;
        }

        setValue(event.target.checked);

        if (props.onChange)
        {
            props.onChange(event.target.checked);
        }
    }

    function onClick(event: MouseEvent<HTMLLabelElement, globalThis.MouseEvent>): void
    {
        if (props.preventDefault)
        {
            event.preventDefault();
        }

        if (props.stopPropagation)
        {
            event.stopPropagation();
        }
    }

    return (
        <label className='custom-checkbox' onClick={onClick}>
            <input type='checkbox' defaultChecked={value} onChange={onChange} />
            <i className='ms-Icon'></i>
        </label>
    );
}
