import { useState } from 'react'
import { FormContext } from './formContext.js'
import { validateForm } from './validate.js'

export default function FormProvider({ initialValues, children }) {
  const [values, setValues] = useState(initialValues)
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)

  // Derived state: tính đồng bộ ngay trong render, 1 lần render cho mỗi phím gõ
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

  // Chỉ hiện lỗi khi người dùng đã rời field hoặc đã bấm Gửi
  const visibleError = (name) => (touched[name] || submitted ? errors[name] : undefined)

  const value = { values, errors, isValid, setSubmitted, handleChange, handleBlur, visibleError }

  // React 19: dùng <FormContext> trực tiếp làm provider (thay cho FormContext.Provider)
  return <FormContext value={value}>{children}</FormContext>
}