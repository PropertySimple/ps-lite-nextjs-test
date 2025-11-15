import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

// NOTE: react-hook-form is not installed
// This component is stubbed out with mock implementations

// Mock types from react-hook-form
type FieldValues = Record<string, any>
type FieldPath<T extends FieldValues> = string
type ControllerProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: any
  name: TName
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (props: any) => React.ReactElement
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  rules?: any
  shouldUnregister?: boolean
}

// Mock FormProvider
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormProvider = ({ children, ...props }: any) => (
  <div {...props}>{children}</div>
)

// Mock useFormContext
const useFormContext = () => ({
  getFieldState: () => ({}),
  formState: {},
  watch: () => undefined,
  control: {},
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSubmit: (callback: any) => (e: any) => {
    e?.preventDefault?.()
    callback({})
  },
  setValue: () => {},
  reset: () => {},
})

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  render,
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name }}>
      {render({
        field: {
          name,
          value: "",
          onChange: () => {},
          onBlur: () => {},
          ref: () => {},
        },
        fieldState: {
          error: undefined,
          isDirty: false,
          isTouched: false,
          invalid: false,
        },
        formState: {
          isDirty: false,
          errors: {},
          touchedFields: {},
        },
      })}
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)

  const { id } = itemContext || { id: "" }

  return {
    id,
    name: fieldContext?.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    error: undefined as any,
    isDirty: false,
    isTouched: false,
    invalid: false,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  useFormContext,
}
