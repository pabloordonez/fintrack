import './LoadingIndicator.scss';
import { ReactElement, PropsWithChildren } from 'react';
import React from 'react';
import { LoadingWheel } from '../LoadingWheel/LoadingWheel';

export interface LoadingIndicatorProps
{
    label: string;
}

export function LoadingIndicator(props: PropsWithChildren<LoadingIndicatorProps>): ReactElement
{
    return (
        <div className='loading-indicator'>
            <div><LoadingWheel /></div>
            <span>{props.label}</span>
        </div>
    );
}
