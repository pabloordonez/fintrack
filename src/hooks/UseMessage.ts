import { useEffect, useState } from 'react';
import { useDependency } from '../contexts/DependencyContext';
import { MessageBusService } from '../services/messaging/MessageBus';
import { ObjectType } from '@miracledevs/paradigm-web-di';

/**
 * Registers the component to a message coming from the message bus.
 * @param messageType The message type.
 */
export function useMessageListener<T>(messageType: ObjectType<T>): T | undefined
{
    const messageBus = useDependency(MessageBusService);
    const [message, setMessage] = useState<T>();

    useEffect(() =>
    {
        const token = messageBus.register<T>(messageType, setMessage);
        return () => messageBus.unregister(token);
    },  [messageBus, messageType]);

    return message;
}
