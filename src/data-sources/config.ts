/* eslint-disable no-console, no-undefined */
import { ConfigurationModel, IConfigurationModel } from '../features/configuration';

const configuration: IConfigurationModel | null = null;

export const getConfiguration = (): IConfigurationModel => {
    if (configuration === null) {
        const error = Error('Configuration has either not been fetch or there was a problem fetching it.');
        console.warn(error.message, error);

        return ConfigurationModel.create({
            AppTitle: process.env.REACT_APP__TITLE,
            GithubRepositoryUri: process.env.REACT_APP__GITHUB_REPOSITORY_URI,
            Auth0Domain: process.env.REACT_APP__AUTH0__DOMAIN,
            Auth0ClientId: process.env.REACT_APP__AUTH0__CLIENT_ID,
            MoodfulApiUri: process.env.REACT_APP__MOODFUL_API__URI
        });
    }

    return configuration;
};
