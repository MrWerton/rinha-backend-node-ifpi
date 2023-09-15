import {AppException} from "./app-exception";

export class NotFoundException extends AppException {
    constructor(message: string) {
        super(400, message);
    }
}