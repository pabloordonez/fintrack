import './LoadingWheel.scss';
import { ReactElement } from 'react';
import React from 'react';

export function LoadingWheel(): ReactElement
{
    return (
        <div className='loading-wheel'>
            <div className='dots'></div>
        </div>
    );
}
