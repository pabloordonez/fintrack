import './ModalFrame.scss';
import React, { ReactElement, PropsWithChildren } from 'react';
import { Card } from '../../Card/Card';

export function ModalFrame(props: PropsWithChildren<{}>): ReactElement
{
    return (
        <div className='modal-overlay'>
            <div className='modal-frame'>
                <Card>
                    {props.children}
                </Card>
            </div>
        </div>
    );
}
