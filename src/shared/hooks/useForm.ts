import React, { useState } from 'react';

type ValidationRuleObject = { errorMessage: string };

type ValidationRule = boolean | ValidationRuleObject;

type ValidationType = 'email';

type ValidationParams = {
  isRequired?: ValidationRule;
  type?: ValidationType;
};

type Validation<T> = {
  [key in keyof T]?: ValidationParams;
};

type AllowedValue = string | number | boolean;

interface InitialValue {
  [key: string]: AllowedValue;
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
    const checkedValue = value[key];

    if (validationRules.isRequired) {
      const requiredErrors = requiredCheck(checkedValue, validationRules);
      if (requiredErrors) {
        invalidName = invalidName || key;
        errors[key] = requiredErrors;
      }
    }

    if (validationRules.type === 'email') {
      const emailErrors = emailCheck(checkedValue)
      if (emailErrors) {
        invalidName = invalidName || key;
        errors[key] = emailErrors;
      }
    }
  });
  return { isValid: !Object.keys(errors).length, invalidName, errors };
};

const requiredCheck = (
  checkedValue: AllowedValue,
  validationRules: ValidationParams,
) => {
  if (typeof checkedValue === 'string') {
    if (checkedValue.trim() === '') {
      if (typeof validationRules.isRequired === 'boolean') {
        return true;
      } else {
        return validationRules.isRequired?.errorMessage;
      }
    }
  }
  return false
};

const emailCheck = (
  checkedValue: AllowedValue,
) => {
  if (typeof checkedValue === 'string') {
    if (checkedValue.toLowerCase().match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      return false;
    } 
  }
  return 'incorrect email format'
};

const getDefaultErrors = (value: InitialValue) => {
  const errors = {} as Errors;

  Object.keys(value).forEach((key) => (errors[key] = false));

  return errors;
};
