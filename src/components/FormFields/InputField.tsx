import { Input, InputProps } from '@heroui/react';
import React from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

interface Props extends UseControllerProps {
  name: string;
  // eslint-disable-next-line
  control: any;
}

type InputFieldProps = Props & InputProps

const InputField: React.FC<InputFieldProps> = (props) => {
  const { field, fieldState } = useController(props)

  const { name, ...inputProps } = props

  return (
    <Input
      {...field}
      {...inputProps}
      id={name}
      className={props.className || 'mt-[1em] mb-[2em]'}
      classNames={{
        ...inputProps.classNames,
        helperWrapper: ['absolute top-[35px]']
      }}
      value={field.value || ''}
      errorMessage={fieldState.error?.message}
      isInvalid={Boolean(fieldState.error)}
      onValueChange={(value) => field.onChange(value)}
    />
  );
};

export default InputField;
