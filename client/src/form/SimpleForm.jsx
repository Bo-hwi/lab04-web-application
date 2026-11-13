import FormProvider from './FormProvider.jsx'
import InputField from './InputField.jsx'
import { useFormContext } from './formContext.js'

const INITIAL_VALUES = { fullName: '', email: '', password: '', confirmPassword: '' }

function FormBody() {
  const { setSubmitted } = useFormContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
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
  )
}

export default function SimpleForm() {
  return (
    <FormProvider initialValues={INITIAL_VALUES}>
      <FormBody />
    </FormProvider>
  )
}