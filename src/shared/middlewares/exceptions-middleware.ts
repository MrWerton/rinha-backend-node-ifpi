import {NextFunction, Request, Response} from "express";
import {AppException} from "../exceptions/app-exception";

export function handleExceptionsMiddleware(
    error: Error,
    req: Request,
    response: Response,
    next: NextFunction
) {
    if (error instanceof AppException) {
        return response
            .status(error.code)
            .json({message: error.message});
    }

    return response.status(500).json({
        status: "error",
        message: `Internal server error: ${error.message}`,
    });
}