import {AppException} from "./app-exception";

export class InvalidArgumentsException extends AppException {
    constructor(message: string) {
        super(400, message);
    }
}