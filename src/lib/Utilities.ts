
export const isInDevBuildEnv = (): boolean => process.env.NODE_ENV === 'development'

export function isNil(value: unknown): value is null | undefined {
    // eslint-disable-next-line no-undefined
    return value === null || value === undefined
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
