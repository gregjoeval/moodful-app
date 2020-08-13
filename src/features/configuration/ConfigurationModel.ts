const DEFAULT_STRING_VALUE = 'DEFAULT_STRING_VALUE';

export interface IConfigurationModel {
    AppTitle: string;
    GithubRepositoryUri: string;
    Auth0Domain: string;
    Auth0ClientId: string;
    MoodfulApiUri: string;
}

const create = (args: Partial<IConfigurationModel> = {}): IConfigurationModel => ({
    AppTitle: args.AppTitle ?? DEFAULT_STRING_VALUE,
    GithubRepositoryUri: args.GithubRepositoryUri ?? DEFAULT_STRING_VALUE,
    Auth0Domain: args.Auth0Domain ?? DEFAULT_STRING_VALUE,
    Auth0ClientId: args.Auth0ClientId ?? DEFAULT_STRING_VALUE,
    MoodfulApiUri: args.MoodfulApiUri ?? DEFAULT_STRING_VALUE
});

const ConfigurationModel = {
    create: create
};

export default ConfigurationModel;
