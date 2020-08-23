import { Configuration as ClientConfiguration, ReviewsApi, TagsApi } from '@gjv/moodful-api-client';
import { IReviewModel, ReviewModel } from '../features/reviews';
import { ITagModel, TagModel } from '../features/tags';
import { getAccessToken } from '../higher-order-components/WithJWT';
import { getConfiguration } from './config';

const createClientConfiguration = (): ClientConfiguration => {
    const config = getConfiguration();
    const accessToken = getAccessToken();
    const fetchApi = async (input: RequestInfo, init?: RequestInit): Promise<Response> => fetch(input, init);
    const middleware: Array<any> = [];
    return new ClientConfiguration({
        basePath: `${config.MoodfulApiUri}/api`,
        // apiKey: accessToken,
        // accessToken: accessToken,
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        fetchApi: fetchApi,
        middleware: middleware
    });
};

export const getTags = async (): Promise<Array<ITagModel>> => {
    const clientConfiguration = createClientConfiguration();
    const api = new TagsApi(clientConfiguration);

    const tags = await api.getTags();
    return tags?.map((tag) => TagModel.mapReviewTagsToReviewTagModel(tag)) ?? [];
};

export const getReviews = async (): Promise<Array<IReviewModel>> => {
    const clientConfiguration = createClientConfiguration();
    const api = new ReviewsApi(clientConfiguration);

    const reviews = await api.getReviews();
    return reviews?.map((review) => ReviewModel.mapReviewToReviewModel(review)) ?? [];
};

export const createReview = async (model: IReviewModel): Promise<IReviewModel> => {
    const clientConfiguration = createClientConfiguration();
    const api = new ReviewsApi(clientConfiguration);

    const review = await api.postReviews({ review: ReviewModel.mapReviewModelToReview(model) });
    return ReviewModel.mapReviewToReviewModel(review);
};
