import React, { ReactElement } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';

const withErrorBoundary = <
    TComponent extends React.ComponentType<any>
    > (
        fallback: NonNullable<React.ReactNode>|null,
        onError: ((error: Error, errorInfo: React.ErrorInfo) => void)|null,
        Component: TComponent
    ) => (props: React.ComponentPropsWithRef<TComponent>): ReactElement<any, any> | null => (
        <ErrorBoundary
            fallback={fallback}
            onError={onError}
        >
            <Component {...props} />
        </ErrorBoundary>
    );

export default withErrorBoundary;
