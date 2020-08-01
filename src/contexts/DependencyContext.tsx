import React, { ReactNode, ReactElement, useContext } from 'react';
import { DependencyCollection, DependencyContainer, ObjectType } from '@miracledevs/paradigm-web-di';

/**
 * The type of the context value.
 */
type DependencyContextValueType = { collection: DependencyCollection, container?: DependencyContainer };

/**
 * The type of the provider properties.
 */
type DependencyProviderProps = { children: ReactNode };

/**
 * The context dependency collection.
 * Contains a list of all the registered services that can
 * be resolved.
 */
export const ContextCollection = new DependencyCollection();

/**
 * Declares the initial context value.
 */
const ContextValue: DependencyContextValueType = { collection: ContextCollection };

/**
 * Dependency injection react context.
 */
export const DependencyContext = React.createContext<DependencyContextValueType>(ContextValue);

/**
 * Gets the dependency provider component.
 * @param props The component properties.
 */
export function DependencyProvider(props: DependencyProviderProps): ReactElement
{
    const { children } = props;
    return (
        <DependencyContext.Provider value={ContextValue}>
            {children}
        </DependencyContext.Provider>
    );
}

/**
 * Resolves a service by its type, and returns the instance.
 * The instance life cycle is defined in the service registration.
 * @param serviceType The service type.
 */
export function useDependency<T>(serviceType: ObjectType<T>): T
{
    const dependencyContext = useContext(DependencyContext);

    if (!dependencyContext.container)
    {
        dependencyContext.container = dependencyContext.collection.buildContainer(true);
    }

    return dependencyContext.container.resolve(serviceType);
}

/**
 * Resolves a service by its type, and returns the instance.
 * The instance life cycle is defined in the service registration.
 * @param dependencies The dependencies.
 */
export function useDependencies(...dependencies: ObjectType[]): any[]
{
    const dependencyContext = useContext(DependencyContext);

    const container = (!dependencyContext.container)
        ? dependencyContext.container = dependencyContext.collection.buildContainer(true)
        : dependencyContext.container;

    return dependencies.map(x => container.resolve(x));
}
