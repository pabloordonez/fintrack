import './LoadingSplash.scss';
import { ReactElement } from 'react';
import React from 'react';
import { LoadingIndicator } from '../LoadingIndicator/LoadingIndicator';
import { useMessageListener } from '../../../../hooks/UseMessage';
import { LoadingMessage } from '../../../../messages/LoadingMessage';

export function LoadingSplash(): ReactElement
{
    const message = useMessageListener(LoadingMessage);
    const show = message?.show || false;
    const label = message?.label || '';

    return (
        <>
            {show &&
                <div className='loading-splash'>
                    <LoadingIndicator label={label} />
                </div>}
        </>
    );
}
