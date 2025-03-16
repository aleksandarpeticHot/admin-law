import { AutocompleteProps, Autocomplete } from '@heroui/react'
import React from 'react'
import { useController, UseControllerProps } from 'react-hook-form'

interface Props extends UseControllerProps {
  name: string;
  // eslint-disable-next-line
  control: any;
}

type AutCompleteFieldProps = Props & AutocompleteProps

const AutCompleteField: React.FC<AutCompleteFieldProps> = (props) => {
  const { field, fieldState } = useController(props)

  const { name, ...autoCompleteProps } = props

  return <Autocomplete
    {...field}
    {...autoCompleteProps}
    id={name}
    className='mb-[2em]'
    classNames={{
      ...autoCompleteProps.classNames
    }}
    value={field?.value?.toString() || ''}
    isInvalid={Boolean(fieldState.error?.message)}
    onSelectionChange={(selected) => field.onChange(selected?.toString())}
    errorMessage={fieldState.error?.message}
  />
}
export default AutCompleteField