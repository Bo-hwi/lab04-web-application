// This .js file contains NO JSX (slide 23 puts JSX in FormContext.js → Vite reports an error)
import { createContext, useContext } from 'react'

export const FormContext = createContext(null)

export function useFormContext() {
  const ctx = useContext(FormContext)
  if (ctx === null) {
    throw new Error('useFormContext phải được dùng bên trong <FormProvider>')
  }
  return ctx
}