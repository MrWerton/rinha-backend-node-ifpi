import {NextFunction, Request, Response} from "express";
import {AppException} from "../exceptions/app-exception";

export function handleExceptionsMiddleware(
    error: Error,
    req: Request,
    response: Response,
    next: NextFunction
) {
    if (error instanceof AppException) {
        console.log('here')
        return response
            .status(error.code)
            .json({message: error.message});
    }

    return response.send(500).json({
        status: "error",
        message: `Internal server error: ${error.message}`,
    });
}