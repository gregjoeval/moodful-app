import { useEffect, useRef, useState } from 'react'
import { isNil } from '../lib/Utilities'

type UsePollingCallback = (iterations: number) => void

/**
 * Similar to useInterval except with the ability to change the interval and limit during the hook's lifetime
 * Source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 * @param {Function} callback - function to be executed per interval
 * @param {number} interval - number of milliseconds, must be greater than zero
 * @param {number | null} limit - total number of times the callback function is allowed to be executed
 * @returns {number} - the number of times the callback function has been executed
 */
function usePolling(callback: UsePollingCallback, interval: number, limit: number | null = null): number {
    if (interval <= 0) throw new Error('interval must be a number greater than zero')

    const [iterations, setIterations] = useState(0)
    const [hasStarted, setHasStarted] = useState(false)
    const savedCallback = useRef<UsePollingCallback>()

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    // Set up the interval.
    useEffect(() => {
        const tick = (): void => {
            if (isNil(savedCallback.current)) {
                return
            }

            savedCallback.current(iterations)
            setIterations((numberOfIterations) => numberOfIterations + 1)
        }

        if (!hasStarted) {
            setHasStarted(true)
            tick()
        }

        if (limit === null || iterations < limit) {
            const id = window.setTimeout(tick, interval)

            return () => {
                window.clearTimeout(id)
            }
        }

        // intentional, useEffect must return a function or undefined
        // eslint-disable-next-line no-undefined
        return undefined
    }, [iterations, hasStarted, interval, limit])

    return iterations
}

export default usePolling
