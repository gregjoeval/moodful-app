import { Tag } from '@gjv/moodful-api-client'
import moment from 'moment'
import { isNil } from '../../lib/Utilities'

export interface ITagModel {
    id: string;
    createdAt: string | null;
    lastModified: string | null;
    avatar: string | null;
    title: string;
    color: string | null;
}

const create = (args: Partial<ITagModel> = {}): ITagModel => {
    if (isNil(args.id)) throw new Error('Missing required property id on IReviewTags')
    if (isNil(args.title)) throw new Error('Missing required property title on IReviewTags')
    return {
        id: args.id,
        createdAt: args.createdAt ?? null,
        lastModified: args.lastModified ?? null,
        avatar: args.avatar ?? null,
        title: args.title,
        color: args.color ?? null,
    }
}

const mapFromApiModel = (model: Tag): ITagModel => create({
    ...model, // TODO: map the props, this is lazy
    createdAt: model.createdAt?.toISOString(),
    lastModified: model.lastModified?.toISOString(),
})

const mapToApiModel = (model: ITagModel): Tag => ({
    ...model, // TODO: map the props, this is lazy
    // eslint-disable-next-line no-undefined
    avatar: model.avatar ?? undefined,
    // eslint-disable-next-line no-undefined
    color: model.color ?? undefined,
    createdAt: moment(model.createdAt).toDate(),
    lastModified: isNil(model.lastModified) ? null : moment(model.lastModified).toDate(),
})

const TagModel = {
    create: create,
    mapFromApiModel: mapFromApiModel,
    mapToApiModel: mapToApiModel,
}

export default TagModel
