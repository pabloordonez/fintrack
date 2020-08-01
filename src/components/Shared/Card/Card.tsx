import './Card.scss';
import React, { ReactElement, PropsWithChildren } from 'react';

export function Card(props: PropsWithChildren<{}>): ReactElement
{
    return (
        <section className='card'>
           { props.children }
        </section>
    );
}
