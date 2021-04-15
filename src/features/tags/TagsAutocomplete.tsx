import { StatusEnum } from '@gjv/redux-slice-factory'
import CircularProgress from '@material-ui/core/CircularProgress'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import Autocomplete, { AutocompleteProps, createFilterOptions } from '@material-ui/lab/Autocomplete'
import React, { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useRequester from '../../hooks/UseRequester'
import { isNil } from '../../lib/Utilities'
import TagChip from './TagChip'
import { ITagModel, TagsDuck } from './index'

type AutocompleteModel = ITagModel

interface ITagsAutocompleteProps<T, TAutocompleteProps extends AutocompleteProps<T, true, false, false> = AutocompleteProps<T, true, false, false>> {
    id?: string,
    label: string,
    onChange: TAutocompleteProps['onChange'],
    value: TAutocompleteProps['value'],
    limitTags?: TAutocompleteProps['limitTags'],
    error?: TextFieldProps['error'],
    helperText?: TextFieldProps['helperText'],
    variant?: TextFieldProps['variant'],
}

const filterOptions = createFilterOptions<AutocompleteModel>({
    ignoreCase: true,
    matchFrom: 'any',
    stringify: (option) => `${option?.avatar ?? ''} ${option.title}`,
    trim: true,
})

const TagsAutocomplete: React.FunctionComponent<ITagsAutocompleteProps<AutocompleteModel>> = ({
    label,
    value,
    onChange,
    error,
    helperText,
    id = 'TagsAutocomplete',
    variant = 'outlined',
    limitTags,
}) => {
    const dispatch = useDispatch()

    const status = useSelector(TagsDuck.Selectors.selectStatus)
    const isLoading = useMemo(() => status === StatusEnum.Requesting, [status])

    const data = useRequester(
        TagsDuck.Selectors.selectShouldRequest,
        TagsDuck.Selectors.selectAll,
        () => dispatch(TagsDuck.Actions.get())
    )

    const [inputValue, setInputValue] = useState<string | null>(null)

    const noOptionsText = useMemo(() => {
        if (data.length === value?.length) return 'There aren\'t any more tags to show...'
        if (isNil(inputValue) || inputValue.length === 0) return 'Type what you\'re feeling'
        return `"${inputValue}" was not found`
    }, [data.length, inputValue, value?.length])

    // concat the existing values with the search results to avoid warning telling us that the selected values don't appear in the current options
    const options = useMemo(() => (data ?? []).concat(value ?? []), [data, value])

    return (
        <Autocomplete
            autoComplete={true}
            autoHighlight={true}
            disableClearable={true}
            filterOptions={filterOptions}
            filterSelectedOptions={true}
            getOptionLabel={(option) => option.title}
            getOptionSelected={(option, val) => option.id === val.id}
            id={id}
            limitTags={limitTags}
            loading={isLoading}
            multiple={true}
            noOptionsText={noOptionsText}
            openOnFocus={true}
            options={options}
            renderInput={(params) => (
                <TextField
                    {...params}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {isLoading && (
                                    <CircularProgress
                                        color={'inherit'}
                                        size={'1.5rem'}
                                    />
                                )}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                    error={error}
                    helperText={helperText}
                    label={label}
                    variant={variant}
                />
            )}
            renderOption={(option) => (
                <TagChip
                    avatar={option.avatar}
                    color={option.color}
                    key={option.id}
                    title={option.title}
                />
            )}
            renderTags={(value, getTagProps) => value.map((option, index) => (
                <TagChip
                    {...getTagProps({ index: index })}
                    avatar={option.avatar}
                    color={option.color}
                    key={option.id}
                    title={option.title}
                />
            ))}
            value={value}
            onChange={onChange}
            onInputChange={(_event, newValue) => {
                setInputValue(newValue)
            }}
        />
    )
}

export default TagsAutocomplete
