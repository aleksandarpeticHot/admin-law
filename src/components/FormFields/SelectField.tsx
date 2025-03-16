import { Select, SelectProps } from '@heroui/react'
import React, { ChangeEvent } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'

interface Props extends UseControllerProps {
  name: string;
  // eslint-disable-next-line
  control: any;
}

type SelectFieldProps = Props & SelectProps

const SelectField: React.FC<SelectFieldProps> = (props) => {
  const { field, fieldState } = useController(props)

  const { name, ...selectProps } = props

  return <Select
    {...field}
    {...selectProps}
    id={name}
    className='mt-[1em] mb-[2em]'
    classNames={{
      ...selectProps.classNames,
      helperWrapper: [
        'absolute top-[35px]'
      ]
    }}
    selectedKeys={field?.value?.toString() || ''}
    isInvalid={Boolean(fieldState.error?.message)}
    onChange={(e: ChangeEvent<HTMLSelectElement>) => field.onChange(e.target.value)}
    errorMessage={fieldState.error?.message}
  />
}
export default SelectField