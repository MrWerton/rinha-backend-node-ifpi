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
        const notificationErrors: string[] = [];

        if (!this.nickname || this.nickname.trim() === '') {
            notificationErrors.push('Nickname is required and cannot be empty.');
        }

        if (!this.name || this.name.trim() === '') {
            notificationErrors.push('Name is required and cannot be empty.');
        }

        if (!this.birthDate) {
            notificationErrors.push('Valid birthDate is required.');
        }

        if (!this.stack || !Array.isArray(this.stack) || this.stack.length === 0) {
            notificationErrors.push('Stack must be a non-empty array.');
        }

        if (notificationErrors.length > 0) {
            throw new InvalidArgumentsException(notificationErrors.join('\n'));
        }
    }
}