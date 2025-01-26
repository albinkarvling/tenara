import {NextFunction, Request, Response} from "express";

type AsyncHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<any>;

export const asyncHandler = (handler: AsyncHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(handler(req, res, next)).catch(next);
    };
}; 