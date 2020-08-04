import React, { ReactElement } from 'react';
import { ModalFrame } from '../ModalFrame/ModalFrame';
import { ModalContentProps } from '../../../../hooks/UseModal';
import './ConfirmModal.scss';

export interface ConfirmModalProps
{
    title: string;
    content: string;
}

export function ConfirmModal(props: ModalContentProps<ConfirmModalProps, boolean>): ReactElement
{
    return (
        <ModalFrame>
            <div className='modal-content'>
                <h1>{props.title}</h1>
                <div>
                    {props.content}
                </div>
                <div className='modal-actions'>
                    <button className='accept' onClick={() => props.onClose(true)}>Yes</button>
                    <button className='delete' onClick={() => props.onClose(false)}>No</button>
                </div>
            </div>
        </ModalFrame>
    );
}

/*

Example of a modal caller:

export function ModalCaller(props: PropsWithChildren<{}>): ReactElement
{
    const [showModal, result] = useModal(ConfirmModal, { title: 'Remove Entity', content: 'Are you sure?' });

    return (
        <div>
            <button onClick={showModal}>Open Modal</button>
            <div>
                Result: {result !== undefined ? result.toString() : 'waiting result'}
            </div>
        </div>
    );
}

*/
