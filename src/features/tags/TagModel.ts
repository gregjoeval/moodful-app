import { Tag } from '@gjv/moodful-api-client';
import { isNil } from '../../lib/Utilities';

export interface ITagModel {
    id: string;
    createdAt: Date | null;
    lastModified: Date | null;
    title: string;
    color: string;
}

const create = (args: Partial<ITagModel> = {}): ITagModel => {
    if (isNil(args.id)) throw new Error('Missing required property id on IReviewTags');
    if (isNil(args.title)) throw new Error('Missing required property title on IReviewTags');
    if (isNil(args.color)) throw new Error('Missing required property color on IReviewTags');
    return {
        id: args.id,
        createdAt: args.createdAt ?? null,
        lastModified: args.lastModified ?? null,
        title: args.title,
        color: args.color
    };
};

const mapReviewTagsToReviewTagModel = (model: Tag): ITagModel => create({
    ...model // TODO: map the props, this is lazy
});

const TagModel = {
    create: create,
    mapReviewTagsToReviewTagModel: mapReviewTagsToReviewTagModel
};

export default TagModel;
