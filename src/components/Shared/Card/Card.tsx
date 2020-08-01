import React, { ReactElement, PropsWithChildren } from 'react';
import './Card.scss';

export function Card(props: PropsWithChildren<{}>): ReactElement
{
    return (
        <section className='card'>
           { props.children }
        </section>
    );
}
