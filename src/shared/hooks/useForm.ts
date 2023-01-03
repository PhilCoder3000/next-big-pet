import React, { useState } from 'react';

type ValidationRuleObject = { errorMessage: string };

type ValidationRule = boolean | ValidationRuleObject;

type Validation<T> = {
  [key in keyof T]?: {
    isRequired?: ValidationRule;
    isEmail?: ValidationRule;
  };
};

interface InitialValue {
  [key: string]: string | number | boolean;
}

type Errors = Record<keyof InitialValue, boolean | string>;

export function useForm<T extends InitialValue>(
  initialValue: T,
  onSubmit: (value: T) => void,
  validation?: Validation<T>,
) {
  const [value, setValue] = useState<T>(initialValue);
  const [errors, setErrors] = useState(() => getDefaultErrors(initialValue));

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: inputValue } = e.target;
    if (name in value) {
      setValue((prev) => ({
        ...prev,
        [name]: inputValue,
      }));
    }
  };

  const submitHandler = () => {
    if (validation) {
      const { isValid, invalidName, errors } = validateValue(value, validation);

      if (isValid) {
        onSubmit(value);
      } else {
        setErrors(errors);
        document
          .getElementsByName(invalidName)[0]
          .scrollTo({ behavior: 'smooth' });
      }
    } else {
      onSubmit(value);
    }
  };

  return {
    value,
    errors,
    changeHandler,
    submitHandler,
  };
}

const validateValue = (
  value: InitialValue,
  validation: Validation<InitialValue>,
) => {
  let invalidName = '';
  let errors = {} as Errors;
  Object.keys(validation).forEach((key) => {
    const validationRules = validation[key]!;
    if (validationRules.isRequired) {
      if (typeof value[key] === 'string') {
        if ((value[key] as string).trim() === '') {
          invalidName = invalidName || key;
          if (typeof validationRules.isRequired === 'boolean') {
            errors[key] = true;
          } else {
            errors[key] = validationRules.isRequired.errorMessage
          }
        }
      }
    }
  });
  return { isValid: !Object.keys(errors).length, invalidName, errors };
};

const getDefaultErrors = (value: InitialValue) => {
  const errors = {} as Errors;

  Object.keys(value).forEach((key) => (errors[key] = false));

  return errors;
};
