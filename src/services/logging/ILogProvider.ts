/**
 * Represents a log provider.
 * The interface was specifically made to
 * match the one from @see console that is
 * the default provider used by @see LoggingService.
 */
export interface ILogProvider
{
    /**
     * Adds a trace log.
     * @param message the message to be logged.
     */
    trace(message: string): void;

    /**
     * Adds a debug log.
     * @param message the message to be logged.
     */
    debug(message: string): void;

    /**
     * Adds an info log.
     * @param message the message to be logged.
     */
    info(message: string): void;

    /**
     * Adds a warn log.
     * @param message the message to be logged.
     */
    warn(message: string): void;

    /**
     * Adds an error log.
     * @param message the message to be logged.
     */
    error(message: string): void;

    /**
     * Adds a critical error log.
     * @param message the message to be logged.
     */
    critical?(message: string): void;
}
