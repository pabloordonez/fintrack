import { useState, useEffect, ComponentType, PropsWithChildren, ReactElement } from 'react';
import React from 'react';

function getDisplayName(WrappedComponent: ComponentType<any>): string
{
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function setDisplayName(WrappedComponent: ComponentType<any>, name: string): void
{
    WrappedComponent.displayName = name;
}

interface IAsyncCallState<T>
{
    loading?: boolean;
    error?: Error;
    content?: T;
}

type PromiseFunction<T = any> = (...args: any[]) => Promise<T>;

export function useAsyncCall<T = any>(promiseFn: PromiseFunction<T>)
{
    const [{ loading, error, content }, setState] = useState({} as IAsyncCallState<T>);

    useEffect(() =>
    {
        setState({ loading: true });
        promiseFn().then(
            x => setState({ content: x, loading: false }),
            e => setState({ error: e, loading: false }));
    }, [promiseFn]);

    return { loading, error, content };
}

export type AsyncContentWrapperProps = { loadingComponent?: ReactElement, errorComponent?: ReactElement, noContentComponent?: ReactElement };
export type AsyncContentProps<TProps, TContent> = { content: TContent } & PropsWithChildren<TProps>;
export type AsyncComponentType = ComponentType<AsyncContentWrapperProps>;

export function withAsyncContent<TProps = any, TContent = any>(WrappedComponent: ComponentType<AsyncContentProps<TProps, TContent>>, componentProps: TProps, promiseFn: PromiseFunction<TContent>): AsyncComponentType
{
    const WithAsyncContent = (props: PropsWithChildren<AsyncContentWrapperProps>): ReactElement =>
    {
        const { loading, error, content } = useAsyncCall(promiseFn);
        const loadingComponent = (loading && (props.loadingComponent || <div>Loading...</div>)) as ReactElement;
        const errorComponent = error && (props.errorComponent || <div style={{ color: 'red' }}>{error.message}</div>);
        const noContentComponent = !content && (props.noContentComponent || <div>There's no content</div>);
        const contentComponent = content && <WrappedComponent content={content} {...componentProps} />;

        return (loadingComponent || errorComponent || noContentComponent || contentComponent);
    };

    setDisplayName(WithAsyncContent, `WithAsyncContent(${getDisplayName(WrappedComponent)})`);
    return WithAsyncContent;
}
