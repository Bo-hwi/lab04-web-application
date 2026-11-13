// File .js KHÔNG chứa JSX (slide 23 để JSX trong FormContext.js → Vite báo lỗi)
import { createContext, useContext } from 'react'

export const FormContext = createContext(null)

export function useFormContext() {
  const ctx = useContext(FormContext)
  if (ctx === null) {
    throw new Error('useFormContext phải được dùng bên trong <FormProvider>')
  }
  return ctx
}