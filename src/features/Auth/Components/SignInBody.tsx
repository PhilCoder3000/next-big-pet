import React, { useState } from 'react';
import { BaseButton } from '../../../shared/buttons/BaseButton';
import { BaseTextField } from '../../../shared/fields/BaseTextField';
import { PasswordTextField } from '../../../shared/fields/PasswordTextField';
import { useForm } from '../../../shared/hooks/useForm';
import { useSignIn } from '../hooks/useSignIn';

interface SignInBodyProps {}

export function SignInBody({}: SignInBodyProps) {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.name === 'email') {
  //     setEmail(e.target.value);
  //   }
  //   if (e.target.name === 'password') {
  //     setPassword(e.target.value);
  //   }
  // };

  const onSubmit = (value: any) => {
    console.log(value);
  };

  const { value, errors, changeHandler, submitHandler } = useForm(
    { email: '', password: '' },
    onSubmit,
    { email: { isRequired: { errorMessage: 'is not email'} }, password: { isRequired: true } },
    );
  console.log('🚀 ~ file: SignInBody.tsx:28 ~ SignInBody ~ errors', errors);
  const { email, password } = value;

  // const { login } = useSignIn(email, password);

  return (
    <>
      <BaseTextField
        className="mb-2"
        placeholder="email"
        value={email}
        name="email"
        onChange={changeHandler}
      />
      <PasswordTextField
        placeholder="password"
        value={password}
        name="password"
        onChange={changeHandler}
      />
      <BaseButton className="ml-auto mt-auto" onClick={submitHandler}>
        Login
      </BaseButton>
    </>
  );
}
