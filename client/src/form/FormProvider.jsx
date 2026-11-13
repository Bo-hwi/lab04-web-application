import { useState } from 'react'
import { FormContext } from './formContext.js'
import { validateForm } from './validate.js'

export default function FormProvider({ initialValues, children }) {
  const [values, setValues] = useState(initialValues)
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)

  // Derived state: calculated synchronously during render, 1 render per keystroke
  const errors = validateForm(values)
  const isValid = Object.keys(errors).length === 0

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  // Show an error only after the user leaves the field or clicks Submit
  const visibleError = (name) => (touched[name] || submitted ? errors[name] : undefined)

  const value = { values, errors, isValid, setSubmitted, handleChange, handleBlur, visibleError }

  // React 19: use <FormContext> directly as the provider (instead of FormContext.Provider)
  return <FormContext value={value}>{children}</FormContext>
}