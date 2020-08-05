import { ContextCollection } from '../../contexts/DependencyContext';
import { DependencyLifeTime } from '@miracledevs/paradigm-web-di';
/*
@Injectable({ collection: ContextCollection, lifeTime: DependencyLifeTime.Singleton })
export class AwaiterService
{
    constructor(
        private readonly notifications: NotificationService,
        private readonly messageBus: MessageBusService)
    {
    }

    async await<T>(message: string, action: Promise<T>, loadingAction?: (x: boolean) => void): Promise<T>
    {
        try
        {
            this.loading(true, message, loadingAction);
            return await action;
        }
        catch (error)
        {
            this.notifications.error(this.processError(error));
        }
        finally
        {
            this.loading(false, message, loadingAction);
        }
    }

    async awaitAction(message: string, action: () => Promise<void>, loadingAction?: (x: boolean) => void): Promise<void>
    {
        try
        {
            this.loading(true, message, loadingAction);
            return await action();
        }
        catch (error)
        {
            this.notifications.error(this.processError(error));
        }
        finally
        {
            this.loading(false, message, loadingAction);
        }
    }

    private loading(loading: boolean, message: string, loadingAction?: (x: boolean) => void): void
    {
        if (loadingAction)
            loadingAction(loading);

        this.messageBus.send(Messages.loading, new LoadingMessage(loading, message));
    }

    private processError(error: Error | any): string
    {
        if (error instanceof Error)
            return error.message;

        if (error instanceof HttpErrorResponse)
        {
            let errorMessages = '';

            if (error.error.title)
                errorMessages += `${error.error.title}\n`;

            if (error.error.errors)
            {
                const errors = error.error.errors;

                for (const property in errors)
                {
                    if (errors.hasOwnProperty(property))
                    {
                        for (const errorMessage of errors[property])
                        {
                            errorMessages += `${errorMessage}\n`;
                        }
                    }
                }
            }

            if (error.error.Message)
            {
                return error.error.Message;
            }

            return errorMessages;
        }
    }
}
*/