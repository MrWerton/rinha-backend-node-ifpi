import {AppException} from "./app-exception";

export class InvalidArgumentsException extends AppException {
    constructor(message: string) {
        console.log(message);
        super(message, 400);
    }
}