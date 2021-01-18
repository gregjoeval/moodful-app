import { useEffect } from 'react';
import { DefaultRootState, useSelector } from 'react-redux';

export const useRequester = <TState = DefaultRootState, TSelected = unknown> (
    shouldRequestSelector: (state: TState) => boolean,
    requester: (() => void) | (() => Promise<void>),
    selector: (state: TState) => TSelected
): TSelected => {
    const shouldRequest = useSelector(shouldRequestSelector);
    const selected = useSelector(selector);

    useEffect(() => {
        if (shouldRequest) {
            void requester();
        }
    }, [requester, shouldRequest]);

    return selected;
};

export default useRequester;
