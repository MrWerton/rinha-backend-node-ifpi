export class User {
    constructor(
        private id: number,
        private nickname: string,
        private name: string,
        private birthDate: Date,
        private stack: string[]
    ) {
    }
}
