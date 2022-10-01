import { Box, Spinner as CSpinner, SpinnerProps } from '@chakra-ui/react'

type Props = {
  isCentered?: boolean
}

const Spinner = ({ isCentered, ...restProps }: Props & SpinnerProps) => {
  if (isCentered) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CSpinner color="#e40277" {...restProps} />
      </Box>
    )
  }

  return <CSpinner color="#e40277" {...restProps} />
}

export default Spinner
