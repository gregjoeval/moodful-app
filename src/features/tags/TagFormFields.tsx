import { FlexLayout } from '@gjv/material-ui-adjunct'
import { TextField, useTheme } from '@material-ui/core'
import { PaletteColor } from '@material-ui/core/styles/createPalette'
import React, { useEffect, useMemo } from 'react'
import { CirclePicker as ColorPicker } from 'react-color'
import { useFormContext } from 'react-hook-form'
import { nameOf } from '../../lib/Utilities'
import TagChip from './TagChip'
import { ITagModel } from './index'

type FormModel = ITagModel

const TagFormFields: React.FunctionComponent = () => {
    const methods = useFormContext<FormModel>()
    const theme = useTheme()

    useEffect(() => {
        methods.register({ name: nameOf<FormModel>('color') })
    }, [methods])

    const { avatar, color, title } = methods.watch()

    const paletteColor = useMemo((): PaletteColor | null => (color && color.length > 0 ? theme.palette.augmentColor({ main: color }) : null), [color, theme.palette])

    return (
        <FlexLayout
            direction={'column'}
            spacing={2}
        >
            <TagChip
                avatar={avatar}
                color={color}
                title={title}
            />
            <ColorPicker
                color={paletteColor?.main}
                styles={{
                    default: {
                        card: {
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        },
                    },
                }}
                onChangeComplete={
                    ({ hex }, event) => {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
                        event.persist()
                        methods.setValue(nameOf<FormModel>('color'), hex)
                    }
                }
            />
            <TextField
                error={Boolean(methods.errors.avatar?.message)}
                helperText={methods.errors.avatar?.message}
                inputRef={methods.register()}
                label={nameOf<FormModel>('avatar')}
                name={nameOf<FormModel>('avatar')}
                variant={'outlined'}
            />
            <TextField
                error={Boolean(methods.errors.title?.message)}
                helperText={methods.errors.title?.message}
                inputRef={methods.register({ required: 'A title is required.' })}
                label={nameOf<FormModel>('title')}
                name={nameOf<FormModel>('title')}
                variant={'outlined'}
            />
        </FlexLayout>
    )
}

export default TagFormFields
