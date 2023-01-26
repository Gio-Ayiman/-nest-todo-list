import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import e, { Request, Response } from "express";
import { TitleError } from "../enums/title-error.enum";

interface HttpResponseError {
    type?: string,
    title: TitleError,
    status: HttpStatus,
    detail?: string,
    instance: string,
    timestamp: string, 
    errors?: string[]
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        let responseBody: HttpResponseError =  {
            title: TitleError.REJECTED_REQUEST,
            status: status, 
            detail: exception.message,
            instance: request.url,
            timestamp: new Date().toISOString()
        }

        response
            .status(status)
            .json(responseBody)
    }
}