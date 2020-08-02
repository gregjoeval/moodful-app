import { Reducer } from '@reduxjs/toolkit';

export interface IDuck<TState, TActions, TSelectors> {
    Name: string;
    Reducer: Reducer<TState>;
    Actions: TActions;
    Selectors: TSelectors;
}
