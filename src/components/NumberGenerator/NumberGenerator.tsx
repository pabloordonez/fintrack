import React, { ReactElement } from 'react';
import { TestMessage } from '../../messages/TestMessage';
import { useDependency } from '../../contexts/DependencyContext';
import { MessageBusService } from '../../services/messaging/MessageBus';
import { LoggingService } from '../../services/logging/LoggingService';
import './NumberGenerator.scss';

export function NumberGenerator(): ReactElement
{
    const messageBus = useDependency(MessageBusService);
    const logger = useDependency(LoggingService);

    function dispatch(): void
    {
        logger.debug('Dispatching random numbers...');
        messageBus.send(new TestMessage([Math.random() * 1000, Math.random() * 1000, Math.random() * 1000]));
    }

    return (
        <button onClick={dispatch}> Generate Random Numbers</button>
    );
}
