import { useState } from 'react'
import FormProvider from './FormProvider.jsx'
import InputField from './InputField.jsx'
import ShowData from './ShowData.jsx'
import { useFormContext } from './formContext.js'

const INITIAL_VALUES = { fullName: '', email: '', password: '', confirmPassword: '' }

function FormBody() {
  const { values, isValid, setSubmitted } = useFormContext()
  // Snapshot of the data at the moment of a valid submit (slide 15: "on valid submit")
  const [submittedData, setSubmittedData] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setSubmittedData(isValid ? values : null)
  }

  return (
    <>
      <h1>Form</h1>
      <form onSubmit={handleSubmit} noValidate aria-label="Đăng ký" className="simple-form">
        <InputField name="fullName" label="Họ tên" autoComplete="name" />
        <InputField name="email" label="Email" type="email" autoComplete="email" />
        <InputField name="password" label="Mật khẩu" type="password" autoComplete="new-password" />
        <InputField
        name="confirmPassword"
        label="Xác nhận mật khẩu"
        type="password"
        autoComplete="new-password"
        />
        <button type="submit">Gửi</button>
      </form>
      {submittedData && <ShowData data={submittedData} />}
    </>
  )
}

export default function SimpleForm() {
  return (
    <FormProvider initialValues={INITIAL_VALUES}>
      <FormBody />
    </FormProvider>
  )
}