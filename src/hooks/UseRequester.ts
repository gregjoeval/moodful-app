import { useCallback, useEffect } from 'react'
import { DefaultRootState, useSelector } from 'react-redux'

export const useRequester = <TState = DefaultRootState, TSelected = unknown> (
    shouldRequestSelector: (state: TState) => boolean,
    selector: (state: TState) => TSelected,
    requester: (() => void) | (() => Promise<void>)
): TSelected => {
    const shouldRequest = useSelector(shouldRequestSelector)
    const selected = useSelector(selector)
    const requesterCallback = useCallback(requester, [requester])

    useEffect(() => {
        if (shouldRequest) {
            void requesterCallback()
        }
    }, [requesterCallback, shouldRequest])

    return selected
}

export default useRequester
