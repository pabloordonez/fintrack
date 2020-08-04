import React, { ReactElement, useState, useEffect, ComponentType, PropsWithChildren } from 'react';

export type ShowModalFunction = () => void;
export type ModalResultFunction<TResult> = (result: TResult) => void;
export type ModalContentProps<TProps, TResult> =  TProps & { onClose: ModalResultFunction<TResult> } & PropsWithChildren<{}>;

class ModalInstance
{
    constructor(public readonly element: ReactElement)
    {
    }
}

class ModalManager
{
    private static _instance: ModalManager;

    public static get instance(): ModalManager
    {
        if (!ModalManager._instance)
            ModalManager._instance = new ModalManager();

        return ModalManager._instance;
    }

    private readonly _instances: ModalInstance[];

    onUpdated: (() => void) | null;

    constructor()
    {
        this._instances = [];
        this.onUpdated = null;
    }

    getAll(): ModalInstance[]
    {
        return [...this._instances];
    }

    add(modalInstance: ModalInstance): void
    {
        this._instances.push(modalInstance);

        if (this.onUpdated)
        {
            this.onUpdated();
        }
    }

    remove(modalInstance: ModalInstance): void
    {
        this._instances.splice(this._instances.indexOf(modalInstance), 1);

        if (this.onUpdated)
        {
            this.onUpdated();
        }
    }
}


export function ModalContainer(): ReactElement
{
    const [modals, setModals] = useState([] as ModalInstance[]);

    useEffect(() =>
    {
        function onUpdated(): void
        {
            setModals(ModalManager.instance.getAll());
        }

        ModalManager.instance.onUpdated = onUpdated;
        return () => { ModalManager.instance.onUpdated = null; };
    });

    return (<>{modals && modals.length > 0 && modals.map((x, i) => (<div key={i}>{x.element}</div>))}</>);
}

export function useModal<TParameter, TResult>(
    Component: ComponentType<ModalContentProps<TParameter, TResult>>,
    props: TParameter,
    callback?: (result: TResult) => void
): [ShowModalFunction, TResult | undefined]
{
    const [modalResult, setModalResult] = useState(undefined as TResult | undefined);

    function onClose(result: TResult): void
    {
        ModalManager.instance.remove(modalInstance);

        if (callback)
            callback(result);

        setModalResult(result);
    }

    function onShow(): void
    {
        ModalManager.instance.add(modalInstance);
    }

    const modalInstance = new ModalInstance(<Component onClose={onClose} { ...props } />);

    return [onShow, modalResult];
}
