import './Page.scss';
import React, { ReactElement, PropsWithChildren } from 'react';

export function Page(props: PropsWithChildren<{}>): ReactElement
{
    return (
        <section className='page-container'>
           { props.children }
        </section>
    );
}
