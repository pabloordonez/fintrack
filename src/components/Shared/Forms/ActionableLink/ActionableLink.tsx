import './ActionableLink.scss';
import React, { ReactElement, PropsWithChildren } from 'react';

interface ActionableLinkProps
{
    onClick: () => void;
}

export function ActionableLink(props: PropsWithChildren<ActionableLinkProps>): ReactElement
{
    return (<span className='actionable-link' onClick={props.onClick}>{props.children}</span>);
}
