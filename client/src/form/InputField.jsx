import { useId } from 'react'
import { useFormContext } from './formContext.js'

export default function InputField({ name, label, type = 'text', ...rest }) {
  // useId() is called in EACH field → unique, stable id (slide 14 calls it once in the Provider → duplicate ids)
  const id = useId()
  const errorId = `${id}-error`
  const { values, handleChange, handleBlur, visibleError } = useFormContext()
  const error = visibleError(name)

  return (
    <div className="field-group">
      <label htmlFor={id}>{label}</label>
      {/* {...rest} goes FIRST so it cannot override the contract props below.
          Slide 24 collects ...props but forgets to spread them → the input receives nothing */}
      <input
        {...rest}
        id={id}
        name={name}
        type={type}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <p id={errorId} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}