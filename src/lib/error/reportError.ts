interface ErrorDetails {
    /** A human readable message on the possible cause of the error. */
    message: string,
    /** 
     * The function or method reporting the error.
     * @example sourceCaller: "getUserService"
     */
    sourceCaller: string,
    /**
     * The file where the `sourceCaller` lives.
     * @example sourceFile: "graphql/resovlers/User/services/getUser/index.ts"
     */
    sourceFile?: string,
}

/**
 * The central point of this system to report failure and errors.
 * 
 * @param error_verbose The full details of the thrown error
 * @param message an optional human readable message info
 * 
 * @returns void;
 */
async function errorReporter(error_verbose: any, message?: ErrorDetails): Promise<void> {
    console.error(message ? message.message : error_verbose)
    // TODO: Implement a technical error reporting and monitoring system.
}

export default errorReporter;