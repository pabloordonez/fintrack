import React, { ReactElement } from 'react';
import { useDependency } from '../../contexts/DependencyContext';
import { LoggingService } from '../../services/logging/LoggingService';
import { useMessageListener } from '../../hooks/UseMessage';
import { TestMessage } from '../../messages/TestMessage';
import './Numbers.scss';

export function Numbers(): ReactElement
{
    const logger = useDependency(LoggingService);
    const message = useMessageListener(TestMessage);

    logger.debug(`${message?.numbers}`);

    return (
        <div className='Numbers'>
            {message ? message.numbers.map(x => x.toFixed(0)).reduce((p, c) => `${p}, ${c}`) : 'There\'s no numbers yet.'}
        </div>
    );
}
