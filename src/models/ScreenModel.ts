import React from 'react'

interface IScreenModelArguments<ScreenProps> extends Omit<IScreenModel<ScreenProps>, 'Icon'> {
    Icon?: JSX.Element;
}

export interface IScreenModel<ScreenProps = Record<string, unknown>> {
    Component: React.FunctionComponent<ScreenProps>;
    Path: string;
    Name: string;
    Icon?: JSX.Element;
}

const create = <ScreenProps> (args: IScreenModelArguments<ScreenProps>): Readonly<IScreenModel<ScreenProps>> => Object.freeze<IScreenModel<ScreenProps>>({
    Component: args.Component,
    Path: args.Path,
    Name: args.Name,
    Icon: args.Icon,
})

const ScreenModel = {
    create: create,
}

export default ScreenModel
