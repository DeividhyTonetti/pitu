import linkModel, {IlinkModel} from './linkModel';
import { Link } from './link';

const findByCode = ( (code: string) => {
    return linkModel.findOne<IlinkModel>({ where: { code }})
});

const add = ( (link: Link) => {
    return linkModel.create<IlinkModel>(link)
});

const hit = ( async (code: string) => {
    const link = await findByCode(code);

    if(!link) return null;

    link.hits!++;
    await link.save();

    return link;
});

export default {
    findByCode,
    add,
    hit
}