import React from 'react';

interface IWithSuspenseProps<TComponent> {
    factory: () => Promise<{ default: TComponent }>,
    fallback?: NonNullable<React.ReactNode>
}

const withSuspense = <TComponent extends React.ComponentType<any>> ({ factory, fallback }: IWithSuspenseProps<TComponent>
): React.FunctionComponent<React.ComponentPropsWithRef<TComponent>> => {
    const LazyComponent = React.lazy(factory);
    return (props: React.ComponentPropsWithRef<TComponent>) => (
        <React.Suspense fallback={fallback ?? null}>
            <LazyComponent {...props} />
        </React.Suspense>
    );
};

export default withSuspense;
