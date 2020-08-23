import { Review } from '@gjv/moodful-api-client';
import moment from 'moment';
import { getISOStringWithOffset, isNil } from '../../lib/Utilities';
import { ITagModel, TagModel } from '../tags';

export interface IReviewModel {
    id: string;
    createdAt: string;
    lastModified: string | null;
    secret: boolean;
    rating?: number;
    description?: string;
    tags: Array<ITagModel>;
}

const create = (args: Partial<IReviewModel> = {}): IReviewModel => {
    if (isNil(args.id)) throw new Error('Missing required property id on IReviewModel');
    if (isNil(args.createdAt)) throw new Error('Missing required property createdAt on IReviewModel');
    return {
        id: args.id,
        createdAt: args.createdAt,
        lastModified: args.lastModified ?? null,
        secret: args.secret ?? false,
        rating: args.rating,
        description: args.description,
        tags: args.tags ?? []
    };
};

const mapReviewToReviewModel = (model: Review): IReviewModel => {
    const tags = model.tags?.map((tag) => TagModel.mapReviewTagsToReviewTagModel(tag));
    return create({
        ...model,
        // eslint-disable-next-line no-undefined
        createdAt: isNil(model.createdAt) ? undefined : getISOStringWithOffset(model.createdAt),
        lastModified: isNil(model.lastModified) ? null : getISOStringWithOffset(model.lastModified),
        tags: tags
    });
};

const mapReviewModelToReview = (model: IReviewModel): Review => ({
    ...model,
    createdAt: moment(model.createdAt).toDate(),
    lastModified: isNil(model.lastModified) ? null : moment(model.lastModified).toDate(),
    tags: []
});

const ReviewModel = {
    create: create,
    mapReviewToReviewModel: mapReviewToReviewModel,
    mapReviewModelToReview: mapReviewModelToReview
};

export default ReviewModel;
