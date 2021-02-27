import React from 'react'

interface IErrorBoundaryState {
    hasError: boolean;
}

interface IErrorBoundaryProps {
    onError: ((error: Error, errorInfo: React.ErrorInfo) => void)|null
    fallback: NonNullable<React.ReactNode>|null
    children: JSX.Element;
}

/**
 * SOURCE: https://reactjs.org/docs/error-boundaries.html
 */
class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
    constructor(props: IErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(): IErrorBoundaryState {
        // Update state so the next render will show the fallback UI.
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        const { onError } = this.props
        // You can also log the error to an error reporting service
        if (onError) {
            onError(error, errorInfo)
        }
    }

    render(): React.ReactNode {
        const { hasError } = this.state
        const { children, fallback } = this.props
        if (hasError) {
            return fallback
        }

        return children
    }
}

export default ErrorBoundary
