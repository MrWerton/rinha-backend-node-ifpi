export class AppException extends Error {
    public readonly message: string;
    public readonly code: number;

    constructor(message: string, code: number) {
        super();
        this.message = message;
        this.code = code;
    }
}

