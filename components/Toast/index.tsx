import { ToastProps } from '@chakra-ui/react'
import { createStandaloneToast } from '@chakra-ui/toast'

const { toast } = createStandaloneToast()

const Toast = {
  success: (props: ToastProps) =>
    toast({
      status: 'success',
      ...props,
    }),
  info: (props: ToastProps) =>
    toast({
      status: 'info',
      ...props,
    }),
  warning: (props: ToastProps) =>
    toast({
      status: 'warning',
      ...props,
    }),
  error: (props: ToastProps) =>
    toast({
      status: 'error',
      ...props,
    }),
}

export default Toast
