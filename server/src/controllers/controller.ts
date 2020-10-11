import { Response, Request } from 'express';

export interface Page {
    current_page: number,
    per_page: number,
    from: number,
    to: number,
    total: number,
    last_page: number
}

export interface PageLinks {
    first: string,
    last: string,
    next?: string,
    prev?: string
}

export default abstract class Controller {
    public abstract index(req: Request, res: Response): void;
    public abstract show(req: Request, res: Response): void;
    public abstract store(req: Request, res: Response): void;
    public abstract update(req: Request, res: Response): void;
    public abstract destroy(req: Request, res: Response): void;
}
