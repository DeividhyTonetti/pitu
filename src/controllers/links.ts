import { Request, Response, text } from 'express';
import { Link } from '../models/link';
import linksRepository from '../models/linksRepository';


const generateCode = ( () => {
    let text = '';
    const possible = 'ABCDEFGHIJQLMNOPQRSTUVWXYZabcdefghijqlmnopqrstuwvxyz0123456789';

    for (let i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
});

const postLink  = ( async (req: Request, res: Response) => {
    const link = req.body as Link;
   
    link.code = generateCode();
    link.hits = 0;
   
    const result = await linksRepository.add(link);
   
    if(!result.id) res.sendStatus(400);

    link.id = result.id;
    res.status(201).json(link);
});

const getLink  = ( async (req: Request, res: Response) => {
    const code = req.params.code as string;
    const link = await linksRepository.findByCode(code);

    if(!link)
        res.sendStatus(404);
    else
        res.json(link);
});

const hitLink  = ( async (req: Request, res: Response) => {
    const code = req.params.code as string;
    const link = await linksRepository.hit(code)

    if(!link)
        res.sendStatus(404);
    else 
        res.json(link);
});

export default {
    postLink,
    getLink,
    hitLink
}