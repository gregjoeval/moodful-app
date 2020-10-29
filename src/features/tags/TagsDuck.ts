import { createEntitySlice, IEntityState, StatusEnum } from '@gjv/redux-slice-factory';
import { Dispatch } from '@reduxjs/toolkit';
import moment from 'moment';
import { getTags } from '../../data-sources/moodful-api';
import { IGlobalState } from '../../store/configureStore';
import { IDuck } from '../types';
import { ITagModel } from './TagModel';

type SliceModel = ITagModel
export type SliceState = IEntityState<SliceModel>

const slice = createEntitySlice<IGlobalState, SliceModel>({
    name: 'ReviewTags',
    selectSliceState: (globalState) => globalState.ReviewTags,
    selectId: (o) => o.id,
    sortComparer: (a, b) => moment(a.createdAt).diff(b.createdAt, 'seconds')
});

const get = () => async (dispatch: Dispatch): Promise<void> => {
    dispatch(slice.actions.setStatus(StatusEnum.Requesting));
    dispatch(slice.actions.setError(null));

    try {
        const reviews = await getTags();
        dispatch(slice.actions.hydrateAll(reviews));
        dispatch(slice.actions.setStatus(StatusEnum.Settled));
    } catch (e) {
        dispatch(slice.actions.setStatus(StatusEnum.Failed));
        dispatch(slice.actions.setError(e));
    }
};

const actions = {
    ...slice.actions,
    get: get
};

const TagsDuck: IDuck<SliceState, typeof actions, typeof slice.selectors> = {
    Name: slice.name,
    Reducer: slice.reducer,
    Actions: actions,
    Selectors: slice.selectors
};

export default TagsDuck;
