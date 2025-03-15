import { TextAreaProps, Textarea } from '@heroui/react';
import React from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

interface Props extends UseControllerProps {
  name: string;
  // eslint-disable-next-line
  control: any;
}

type TextFieldProps = Props & TextAreaProps

const TextField: React.FC<TextFieldProps> = (props) => {
  const { field, fieldState } = useController(props)

  const { name, ...textareaProps } = props

  return (
    <Textarea
      {...field}
      {...textareaProps}
      id={name}
      className='mt-[1em] mb-[2em]'
      classNames={{
        ...textareaProps.classNames,
        helperWrapper: ['absolute top-[35px]']
      }}
      errorMessage={fieldState.error?.message}
      isInvalid={Boolean(fieldState.error)}
      onValueChange={(value) => field.onChange(value)}
    />
  );
};

export default TextField;
