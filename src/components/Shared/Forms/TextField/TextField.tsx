import './TextField.scss';
import React, { ReactElement, PropsWithChildren, useState, ChangeEvent } from 'react';

interface TextFieldProps
{
    name: string;
    object: any;
    field: string;
}

export function TextField(props: PropsWithChildren<TextFieldProps>): ReactElement
{
    const initialValue = props.object[props.field];
    const [value, setValue] = useState(initialValue);

    function onChange(event: ChangeEvent<HTMLInputElement>): void
    {
        props.object[props.field] = event.target.value;
        setValue(event.target.value);
    }

    return (
        <label>
            <span>{props.name}</span>
            <input name={props.name} type='text' value={value} onChange={onChange} />
        </label>
    );
}
