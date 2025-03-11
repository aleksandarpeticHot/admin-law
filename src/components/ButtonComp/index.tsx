import { Button, ButtonProps } from '@heroui/react';
import React from 'react';

interface Props {
  loading?: boolean
}

type ButtonCompProps = Props & ButtonProps

const ButtonComp: React.FC<ButtonCompProps> = (props) => {

  return <Button
    {...props}
  />
}
export default ButtonComp