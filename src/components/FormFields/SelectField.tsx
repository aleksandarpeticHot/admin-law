import { Select, SelectProps } from '@heroui/react'
import React, { ChangeEvent } from 'react'
import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form'

interface Props<T extends FieldValues> extends SelectProps {
  control: Control<T>
  rules?: Omit<RegisterOptions<T, Path<T>>, 'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'> | undefined
  name: Path<T>;
}

const SelectField = <T extends FieldValues>({ control, rules, name, ...selectProps }: Props<T>) => {

  return <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field, fieldState }) => (
      <Select
        {...field}
        {...selectProps}
        name={name}
        className='mt-[1em] mb-[2em]'
        classNames={{
          ...selectProps.classNames,
          helperWrapper: [
            'absolute top-[35px]'
          ]
        }}
        isInvalid={Boolean(fieldState.error?.message)}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => field.onChange(e.target.value)}
        errorMessage={fieldState.error?.message}
      />
    )}
  />
}
export default SelectField