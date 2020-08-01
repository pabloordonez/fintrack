import React, { ReactElement, PropsWithChildren } from 'react';
import './Page.scss';

export function Page(props: PropsWithChildren<{}>): ReactElement
{
    return (
        <section className='page-container'>
           { props.children }
        </section>
    );
}
