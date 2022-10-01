import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  InputProps,
  FormControlProps,
  Box,
} from '@chakra-ui/react'
import { useController, UseControllerProps } from 'react-hook-form'

interface Props
  extends Omit<InputProps, 'name' | 'defaultValue'>,
    UseControllerProps {
  containerProps?: FormControlProps
  label?: string
}

const FormInput = ({
  name,
  label,
  containerProps,
  rules,
  defaultValue = '',
  isRequired,
  ...restProps
}: Props) => {
  const {
    field,
    fieldState: { error, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    rules: { required: !!isRequired, ...rules },
    defaultValue,
  })

  const constructErrorMessage = () => {
    if (error?.type === 'required') {
      return `${label || 'This field'} is required`
    }

    return error?.message || 'This field is invalid'
  }

  return (
    <FormControl mb="4" isInvalid={!!error} {...containerProps}>
      <FormLabel mb="1" htmlFor={name}>
        {label}
        {(isRequired || rules?.required) && (
          <Box color="red.500" ml="1" as="span">
            {label ? '*' : ''}
          </Box>
        )}
      </FormLabel>
      <Input id={name} {...restProps} {...field} />
      {!!error && (
        <FormErrorMessage mt="1">{constructErrorMessage()}</FormErrorMessage>
      )}
    </FormControl>
  )
}

export default FormInput
