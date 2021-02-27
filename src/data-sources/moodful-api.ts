import { Configuration as ClientConfiguration, ReviewsApi, TagsApi } from '@gjv/moodful-api-client'
import { IReviewModel, ReviewModel } from '../features/reviews'
import { ITagModel, TagModel } from '../features/tags'
import { getAccessToken, getSubjectFromAccessToken } from '../higher-order-components/WithJWT'
import { getConfiguration } from './config'

const createClientConfiguration = (): ClientConfiguration => {
    const config = getConfiguration()
    const accessToken = getAccessToken()
    const fetchApi = async (input: RequestInfo, init?: RequestInit): Promise<Response> => fetch(input, init)
    const middleware: Array<never> = []
    return new ClientConfiguration({
        basePath: `${config.MoodfulApiUri}/api`,
        headers: { Authorization: `Bearer ${accessToken}` },
        fetchApi: fetchApi,
        middleware: middleware,
    })
}

export const getTags = async (): Promise<Array<ITagModel>> => {
    const clientConfiguration = createClientConfiguration()
    const api = new TagsApi(clientConfiguration)

    const subject = getSubjectFromAccessToken()
    if (subject === null) throw new Error('Unauthorized.')

    try {
        const tags = await api.getTags({ userId: subject })
        return tags?.map((tag) => TagModel.mapReviewTagsToReviewTagModel(tag)) ?? []
    } catch (err: unknown) {
        const response = err as Response
        if (response.status === 404) return []

        throw response
    }
}

export const getReviews = async (): Promise<Array<IReviewModel>> => {
    const clientConfiguration = createClientConfiguration()
    const api = new ReviewsApi(clientConfiguration)

    const subject = getSubjectFromAccessToken()
    if (subject === null) throw new Error('Unauthorized.')

    try {
        const reviews = await api.getReviews({ userId: subject })
        return reviews?.map((review) => ReviewModel.mapReviewToReviewModel(review)) ?? []
    } catch (err: unknown) {
        const response = err as Response
        if (response.status === 404) return []

        throw response
    }
}

export const createReview = async (model: IReviewModel): Promise<IReviewModel> => {
    const clientConfiguration = createClientConfiguration()
    const api = new ReviewsApi(clientConfiguration)

    const subject = getSubjectFromAccessToken()
    if (subject === null) throw new Error('Unauthorized.')

    const review = await api.postReviews({
        userId: subject,
        review: ReviewModel.mapReviewModelToReview(model),
    })
    return ReviewModel.mapReviewToReviewModel(review)
}
