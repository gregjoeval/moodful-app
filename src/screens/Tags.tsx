import { withAuthenticationRequired } from '@auth0/auth0-react'
import { Stack } from '@gjv/material-ui-adjunct'
import { Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import Header from '../components/Header/Header'
import { TagsDuck } from '../features/tags'
import CreateTagFab from '../features/tags/CreateTagFab'
import TagChip from '../features/tags/TagChip'
import withJWT from '../higher-order-components/WithJWT'
import useRequester from '../hooks/UseRequester'
import { ScreenLayout } from '../layouts'
import ScreenModel from '../models/ScreenModel'

const Path = '/tags'
const Name = 'Tags'

const Tags: React.FunctionComponent = () => {
    const dispatch = useDispatch()

    const tags = useRequester(
        TagsDuck.Selectors.selectShouldMakeRequest,
        TagsDuck.Selectors.selectAll,
        () => dispatch(TagsDuck.Actions.get())
    )

    return (
        <React.Fragment>
            <CreateTagFab />
            <ScreenLayout header={<Header />}>
                <Stack
                    direction={'column'}
                    spacing={1}
                >
                    <Typography variant={'h5'}>
                        {Name}
                    </Typography>
                    {tags.map((tag) => (
                        <TagChip
                            avatar={tag.avatar}
                            color={tag.color}
                            key={tag.id}
                            title={tag.title}
                            onDelete={() => {
                                dispatch(TagsDuck.Actions.remove(tag.id))
                            }}
                        />
                    ))}
                </Stack>
            </ScreenLayout>
        </React.Fragment>
    )
}

const TagsScreen = ScreenModel.create({
    Component: withAuthenticationRequired(withJWT(Tags)),
    Path: Path,
    Name: Name,
})

export default TagsScreen
