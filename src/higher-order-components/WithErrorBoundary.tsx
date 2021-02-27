import React, { ComponentProps } from 'react'
import ErrorBoundary from '../components/ErrorBoundary'

const withErrorBoundary = <
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TComponent extends React.ComponentType<any>
> (
    fallback: NonNullable<React.ReactNode>|null,
    onError: ((error: Error, errorInfo: React.ErrorInfo) => void)|null,
    Component: TComponent
) => (props: ComponentProps<TComponent>): JSX.Element => (
    <ErrorBoundary
        fallback={fallback}
        onError={onError}
    >
        <Component {...props} />
    </ErrorBoundary>
)

export default withErrorBoundary
