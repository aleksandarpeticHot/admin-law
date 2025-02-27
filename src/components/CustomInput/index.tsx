import { Input, InputProps } from "@heroui/react";
import styled from "styled-components";

const StyledCustomInput = styled(Input)`
background: white;
min-width: 300px;
color: hsl(var(--heroui-default-700)) !important;
`

const CustomInput: React.FC<InputProps> = (props) => {

  return <StyledCustomInput
    {...props}
    autoComplete="off"
    autoCorrect="off"
    spellCheck="false"
  />
}
export default CustomInput