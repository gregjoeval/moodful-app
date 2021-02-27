import TagModel, { ITagModel as ModelType } from './TagModel'
import TagsDuck, { SliceState } from './TagsDuck'

const TagsReducer = TagsDuck.Reducer

export default TagsReducer
export { TagsDuck, TagModel }
export type TagsSliceState = SliceState
export type ITagModel = ModelType
