import {
    Avatar,
    Chip, ChipProps,
    useTheme,
} from '@material-ui/core'
import React from 'react'
import { isNil } from '../../lib/Utilities'
import { ITagModel } from './index'

interface ITagChipProps {
    avatar: ITagModel['avatar']
    color: ITagModel['avatar']
    title: ITagModel['title']
    onDelete?: ChipProps['onDelete']
}

const TagChip: React.FunctionComponent<ITagChipProps> = ({ avatar, color, title, onDelete }) => {
    const theme = useTheme()
    const paletteColor = !isNil(color) ? theme.palette.augmentColor({ main: color }) : null

    return (
        <Chip
            avatar={
                isNil(avatar) || avatar === ''
                    // necessary for this prop
                    // eslint-disable-next-line no-undefined
                    ? undefined
                    : (
                        <Avatar
                            style={{
                                color: paletteColor?.main,
                                backgroundColor: paletteColor?.dark,
                            }}
                        >
                            {avatar}
                        </Avatar>
                    )
            }
            label={title}
            style={{
                color: paletteColor?.contrastText,
                backgroundColor: paletteColor?.main,
            }}
            onDelete={onDelete}
        />
    )
}

export default TagChip
