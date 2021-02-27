import { useHistory } from 'react-router-dom'

interface INavigationFunctions {
    navigateTo: (route: string) => void;
    navigateBack: () => void;
}

/**
 * returns navigation functions
 */
export const useNavigation = (): INavigationFunctions => {
    const history = useHistory()
    return {
        navigateTo: (route: string): void => {
            history.push(route)
        },
        navigateBack: (): void => {
            history.goBack()
        },
    }
}

export default useNavigation
