/**
 * check that the NODE_ENV is not production because that variable can be set to other values
 */
export const isInDevBuildEnv = (): boolean => process.env.NODE_ENV !== 'production'

export function isNil(value: unknown): value is null | undefined {
    // eslint-disable-next-line no-undefined
    return value === null || value === undefined
}

/**
 * @internal
 * Reference: https://stackoverflow.com/a/17415677/7571132
 */
export const getISOStringWithOffset = (dateTime: Date = new Date()): string => {
    const tzo = -dateTime.getTimezoneOffset()
    const dif = tzo >= 0 ? '+' : '-'
    const pad = (num: number): string => {
        const norm = Math.floor(Math.abs(num))
        return (norm < 10 ? '0' : '').concat(norm.toString())
    }

    return `${dateTime.getFullYear()}-${pad(dateTime.getMonth() + 1)}-${pad(dateTime.getDate())}T${pad(dateTime.getHours())}:${pad(dateTime.getMinutes())}:${pad(dateTime.getSeconds())}${dif}${pad(tzo / 60)}:${pad(tzo % 60)}`
}

/**
 * @internal
 */
export const mapErrorToSerializableObject = <TError extends Error = Error> (error: TError): Record<keyof Error, string> => {
    const propertyNames = Object.getOwnPropertyNames(error)
    return propertyNames.reduce((accumulator, propertyName) => {
        const propertyDescriptorValue: unknown = Object.getOwnPropertyDescriptor(error, propertyName)?.value
        return {
            ...accumulator,
            [propertyName]: propertyDescriptorValue,
        }
    }, {} as Record<keyof Error, string>)
}

/**
 * SOURCE: https://schneidenbach.gitbooks.io/typescript-cookbook/nameof-operator.html
 * @param name
 */
export const nameOf = <T>(name: keyof T & string): keyof T => name
