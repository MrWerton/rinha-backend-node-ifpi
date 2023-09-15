import {InvalidArgumentsException} from "../../../../shared/exceptions/invalid-arguments-exception";

export class CreateUserDto {
    constructor(
        public nickname: string,
        public name: string,
        public birthDate: Date,
        public stack: string[]
    ) {
        this._handlerValidation();
    }

    _handlerValidation() {
        const notificationExceptions: string[] = [];

        if (!this.nickname || this.nickname.trim() === '') {
            notificationExceptions.push('Nickname is required and cannot be empty.');
        }

        if (!this.name || this.name.trim() === '') {
            notificationExceptions.push('Name is required and cannot be empty.');
        }

        if (!this.birthDate) {
            notificationExceptions.push('birthDate is required.');
        }

        if (!this.stack || !Array.isArray(this.stack) || this.stack.length === 0) {
            notificationExceptions.push('Stack must be a non-empty array.');
        }

        if (notificationExceptions.length > 0) {
            throw new InvalidArgumentsException(notificationExceptions.join('; '));
        }
    }
}