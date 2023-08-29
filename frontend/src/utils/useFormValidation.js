import { useCallback, useState } from "react";

export default function useFormValidation() {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)
  const [isInputValid, setIsInputValid] = useState({})

  function handleChange(evt) {
    const name = evt.target.name
    const value = evt.target.value
    const validationMessage = evt.target.validationMessage
    const valid = evt.target.validity.valid
    const form = evt.target.form

    setValues((initialValues) => {
      return { ...initialValues, [name]: value }
    })

    setErrors((initialErrors) => {
      return { ...initialErrors, [name]: validationMessage }
    })

    setIsInputValid((initialisInputValid) => {
      return { ...initialisInputValid, [name]: valid}
    })

    setIsValid(form.checkValidity())
  }

  function resetData(data={}) {
    setValues(data)
    setErrors({})
    setIsValid(false)
    setIsInputValid({})
}

  const setInitialisValue = useCallback((name, value) => {
    setValues((initialValues) => {
      return { ...initialValues, [name]: value }
    })
  }, [])
  return {values, errors, isValid, isInputValid, handleChange, resetData, setInitialisValue}
}