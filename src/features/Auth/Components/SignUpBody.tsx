import { User } from '@prisma/client';
import React, { useState } from 'react';
import { BaseButton } from '../../../shared/buttons/BaseButton';
import { BaseTextField } from '../../../shared/fields/BaseTextField';
import { PasswordTextField } from '../../../shared/fields/PasswordTextField';
import { useForm } from '../../../shared/hooks/useForm';
import { useSignUp } from '../hooks/useSingUp';

export type SignUpUser = Pick<User, 'name' | 'email' | 'password'>


export function SignUpBody() {
  const [isLoading, setLoading] = useState(false);

  const { signUp } = useSignUp(setLoading)

  const { value, changeHandler, submitHandler } = useForm<SignUpUser>(
    {
      name: '',
      email: '',
      password: '',
    },
    signUp,
    {
      name: {
        isRequired: true,
      },
      email: {
        isRequired: true,
      },
      password: {
        isRequired: true,
      },
    },
  );
  
  const { name, email, password } = value;

  return (
    <>
      <BaseTextField
        placeholder="name"
        name="name"
        value={name}
        onChange={changeHandler}
        className="mb-2"
      />
      <BaseTextField
        placeholder="email"
        name="email"
        value={email}
        onChange={changeHandler}
        className="mb-2"
      />
      <PasswordTextField
        placeholder="password"
        name="password"
        value={password}
        onChange={changeHandler}
      />
      <BaseButton className="ml-auto mt-auto" onClick={submitHandler}>
        Sign up
      </BaseButton>
    </>
  );
}
