import ReviewModel, { IReviewModel as ModelType } from './ReviewModel'
import ReviewsDuck, { SliceState } from './ReviewsDuck'

const ReviewsReducer = ReviewsDuck.Reducer

export default ReviewsReducer
export { ReviewsDuck, ReviewModel }
export type ReviewsSliceState = SliceState
export type IReviewModel = ModelType
