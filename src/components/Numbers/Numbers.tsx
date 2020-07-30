import React, { ReactElement } from 'react';
import './Numbers.scss';
import { useDependency } from '../../contexts/DependencyContext';
import { LoggingService } from '../../services/logging/LoggingService';

export function Numbers(): ReactElement
{
    const logger = useDependency(LoggingService);

    logger.debug("Numbers component is being rendered...");

    return (
        <div className='Numbers'>
            Number Component
        </div>
    );
};