import { Review } from '@gjv/moodful-api-client'
import { DateTime } from 'luxon'
import { isNil } from '../../lib/Utilities'

export interface IReviewModel {
    id: string;
    createdAt: string;
    lastModified: string | null;
    secret: boolean;
    rating?: number;
    description?: string;
    tagIds: Array<string>;
}

const create = (args: Partial<IReviewModel> = {}): IReviewModel => {
    if (isNil(args.id)) throw new Error('Missing required property id on IReviewModel')
    if (isNil(args.createdAt)) throw new Error('Missing required property createdAt on IReviewModel')
    return {
        id: args.id,
        createdAt: args.createdAt,
        lastModified: args.lastModified ?? null,
        secret: args.secret ?? false,
        rating: args.rating,
        description: args.description,
        tagIds: args.tagIds ?? [],
    }
}

const mapFromApiModel = (model: Review): IReviewModel => create({
    ...model, // TODO: map the props, this is lazy
    createdAt: model.createdAt?.toISOString(),
    lastModified: model.lastModified?.toISOString(),
})

const mapToApiModel = (model: IReviewModel): Review => ({
    ...model, // TODO: map the props, this is lazy
    createdAt: DateTime.fromISO(model.createdAt).toJSDate(),
    lastModified: isNil(model.lastModified) ? null : DateTime.fromISO(model.lastModified).toJSDate(),
})

const ReviewModel = {
    create: create,
    mapFromApiModel: mapFromApiModel,
    mapToApiModel: mapToApiModel,
}

export default ReviewModel
