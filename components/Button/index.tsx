import { Button as CButton, ButtonProps } from '@chakra-ui/react'

interface Props extends ButtonProps {}

const Button = ({ children, ...restProps }: Props) => {
  return <CButton {...restProps}>{children}</CButton>
}

export default Button
