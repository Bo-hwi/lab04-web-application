import { useState } from 'react'
import FormProvider from './FormProvider.jsx'
import InputField from './InputField.jsx'
import { useFormContext } from './formContext.js'
import { validateAppeal } from './validateAppeal.js'

const INITIAL_VALUES = {
  appealReason: '',
  evidenceUrl: '',
  evidenceDescription: '',
}

function AppealFormBody({ playerName }) {
  const { values, isValid, setSubmitted } = useFormContext()
  const [submitted, setSubmittedData] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)

    if (isValid) {
      setSubmittedData(true)
    } else {
      setSubmittedData(false)
    }
  }

  return (
    <section aria-labelledby="appeal-form-heading">
      <h2 id="appeal-form-heading">Submit an appeal</h2>
      <p>Player: {playerName}</p>

      <form onSubmit={handleSubmit} noValidate>
        <InputField
          name="appealReason"
          label="Appeal reason"
          autoComplete="off"
        />
        <InputField
          name="evidenceUrl"
          label="Evidence URL (optional)"
          type="url"
          autoComplete="url"
        />
        <InputField
          name="evidenceDescription"
          label="Evidence description (optional)"
          autoComplete="off"
        />
        <button type="submit">Submit appeal</button>
      </form>

      {submitted && (
        <p role="status">
          Appeal for {playerName} is ready for review.
          {' '}
          Reason: {values.appealReason}
        </p>
      )}
    </section>
  )
}

export default function AppealForm({ playerName }) {
  return (
    <FormProvider initialValues={INITIAL_VALUES} validate={validateAppeal}>
      <AppealFormBody playerName={playerName} />
    </FormProvider>
  )
}