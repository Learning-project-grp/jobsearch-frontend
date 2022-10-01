import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  FormControlProps,
  RadioGroup,
  RadioGroupProps,
  Box,
} from '@chakra-ui/react'
import { useController, UseControllerProps } from 'react-hook-form'

interface Props
  extends Omit<RadioGroupProps, 'name' | 'defaultValue'>,
    UseControllerProps {
  containerProps?: FormControlProps
  label?: string
  isRequired?: boolean
}

const FormRadioGroup = ({
  name,
  label,
  containerProps,
  children,
  isRequired,
  rules,
  ...restProps
}: Props) => {
  const {
    field,
    fieldState: { error, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    rules: { required: !!isRequired, ...rules },
    defaultValue: '',
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
            *
          </Box>
        )}
      </FormLabel>
      <RadioGroup id={name} {...restProps} {...field}>
        {children}
      </RadioGroup>
      {!!error && (
        <FormErrorMessage mt="1">{constructErrorMessage()}</FormErrorMessage>
      )}
    </FormControl>
  )
}

export default FormRadioGroup
