/**
 * Enumerates the types of logging entries.
 */

export enum LogType
{
    /**
     * Represents a trace log.
     */
    Trace = 0,

    /**
     * Represents a debug log.
     */
    Debug = 1,

    /**
     * Represents an information log.
     */
    Information = 2,

    /**
     * Represents a warning log.
     */
    Warning = 3,

    /**
     * Represents an error log.
     */
    Error = 4,

    /**
     * Represents a critical error log.
     */
    Critical = 5
}
