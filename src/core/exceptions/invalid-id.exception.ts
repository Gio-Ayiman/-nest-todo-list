import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidIdException extends HttpException {
    constructor() {
        super("Entity with given id not found", HttpStatus.BAD_REQUEST)
    }
}