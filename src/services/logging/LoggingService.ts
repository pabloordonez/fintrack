import { ILogProvider } from './ILogProvider';
import { LogType } from './LogType';
import { Injectable, DependencyLifeTime } from '@miracledevs/paradigm-web-di';
import { ContextCollection } from '../../contexts/DependencyContext';
import { StringService } from '../types/StringService';
import { DateService } from '../types/DateService';

@Injectable({ collection: ContextCollection, lifeTime: DependencyLifeTime.Singleton })
export class LoggingService
{
    /**
     * Error message.
     */
    private static readonly typeNotRecognized: string = 'The provided type is not recognized as a valid log type.';

    /**
     * An array of message templates.
     */
    private messageTemplates: string[];

    /**
     * The minimum log type that will logged.
     * Log types smaller than this value will be ignored.
     */
    private minimumLevel: LogType;

    /**
     * A log provider.
     * By default @see console will be used.
     */
    private logProvider: ILogProvider;

    /**
     * Creates a new instance of @see LoggingService.
     */
    constructor(
        private readonly stringService: StringService,
        private readonly dateService: DateService
    )
    {
        this.messageTemplates = [];
        this.logProvider = console;
        this.minimumLevel = LogType.Trace;
        this.setMessageTemplateForAll('[{0}][{1}] - {3}{2}');
    }

    /**
     * Sets a log provider.
     * By default @see console is used as provider.
     */
    setLogProvider(logProvider: ILogProvider): void
    {
        this.logProvider = logProvider;
    }

    /**
     * Sets the message template for a given log type.
     * There are some predefined content placeholders the user can utilize
     * to configure the custom messages:
     *
     * {0}: The time when the log was added.
     *
     * {1}: The type of the log (Trace, Debug , Information, etc)
     *
     * {2}: A custom tag value provided by the user.
     *
     * {3}: The log message.
     */
    setMessageTemplate(type: LogType, message: string): void
    {
        if (type < 0 || type >= this.messageTemplates.length)
            throw new Error(LoggingService.typeNotRecognized);

        if (!message)
            throw new Error('The message template can not be null, undefined or empty.');

        this.messageTemplates[type] = message;
    }

    /**
     * Sets the message template for all the types.
     * There are some predefined content placeholders the user can utilize
     * to configure the custom messages:
     *
     * {0}: The time when the log was added.
     *
     * {1}: The type of the log (Trace, Debug , Information, etc)
     *
     * {2}: A custom tag value provided by the user.
     *
     * {3}: The log message.
     */
    setMessageTemplateForAll(message: string): void
    {
        if (!message)
            throw new Error('The message template can not be null, undefined or empty.');

        this.messageTemplates = [];
        this.messageTemplates.push(message);
        this.messageTemplates.push(message);
        this.messageTemplates.push(message);
        this.messageTemplates.push(message);
        this.messageTemplates.push(message);
        this.messageTemplates.push(message);
    }

    /**
     * Sets the minimum log level.
     * Log types smaller than this value will be ignored.
     */
    setMinimumLevel(type: LogType): void
    {
        if (type < 0 || type >= this.messageTemplates.length)
            throw new Error(LoggingService.typeNotRecognized);

        this.minimumLevel = type;
    }

    /**
     * Logs the specified message.
     * @param message the message to be logged.
     * @param type the type of log entry.
     * @param tag a tag value used for further analysis.
     */
    log(message: string, type: LogType = LogType.Trace, tag?: string): void
    {
        if (type < 0 || type >= this.messageTemplates.length)
            throw new Error(LoggingService.typeNotRecognized);

        if (type < this.minimumLevel)
            return;

        const formattedMessage = this.stringService.format(this.messageTemplates[type], this.dateService.format(new Date(), 'hh:mm:ss'), LogType[type], tag, message);

        switch (type)
        {
            case LogType.Trace:
                this.logProvider.trace(formattedMessage);
                break;

            case LogType.Debug:
                this.logProvider.debug(formattedMessage);
                break;

            case LogType.Information:
                this.logProvider.info(formattedMessage);
                break;

            case LogType.Warning:
                this.logProvider.warn(formattedMessage);
                break;

            case LogType.Error:
                this.logProvider.error(formattedMessage);
                break;

            case LogType.Critical:
                if (this.logProvider.critical)
                {
                    this.logProvider.critical(formattedMessage);
                }
                else
                {
                    this.logProvider.error(formattedMessage);
                }
                break;
        }
    }

    /**
     * Adds a trace log entry.
     * @param message the message to be logged.
     * @param tag a tag value for the entry.
     */
    trace(message: string, tag?: string): void
    {
        this.log(message, LogType.Trace, tag);
    }

    /**
     * Adds a debug log entry.
     * @param message the message to be logged.
     * @param tag a tag value for the entry.
     */
    debug(message: string, tag?: string): void
    {
        this.log(message, LogType.Debug, tag);
    }

    /**
     * Adds an information log entry.
     * @param message the message to be logged.
     * @param tag a tag value for the entry.
     */
    information(message: string, tag?: string): void
    {
        this.log(message, LogType.Information, tag);
    }

    /**
     * Adds a warning log entry.
     * @param message the message to be logged.
     * @param tag a tag value for the entry.
     */
    warning(message: string, tag?: string): void
    {
        this.log(message, LogType.Warning, tag);
    }

    /**
     * Adds an error log entry.
     * @param message the message to be logged.
     * @param tag a tag value for the entry.
     */
    error(message: string, tag?: string): void
    {
        this.log(message, LogType.Error, tag);
    }

    /**
     * Adds a critical error log entry.
     * @param message the message to be logged.
     * @param tag a tag value for the entry.
     */
    critical(message: string, tag?: string): void
    {
        this.log(message, LogType.Critical, tag);
    }
}
