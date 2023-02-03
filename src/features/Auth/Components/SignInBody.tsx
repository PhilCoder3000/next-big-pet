import { User } from '@prisma/client';
import React, { useState } from 'react';
import { BaseButton } from '../../../shared/buttons/BaseButton';
import { BaseTextField } from '../../../shared/fields/BaseTextField';
import { PasswordTextField } from '../../../shared/fields/PasswordTextField';
import { useForm } from '../../../shared/hooks/useForm';
import { BaseSnackbar } from '../../../shared/snackbar/BaseSnackbar';
import { useSignIn } from '../hooks/useSignIn';

export type SignInUser = Pick<User, 'email' | 'password'>;

export function SignInBody() {
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useSignIn(setError);

  const { value, changeHandler, submitHandler } = useForm<SignInUser>(
    { email: '', password: '' },
    signIn,
    {
      email: { isRequired: { errorMessage: 'is not email' } },
      password: { isRequired: true },
    },
  );

  const { email, password } = value;

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
        Sign in
      </BaseButton>
      <BaseSnackbar text={error} />
    </>
  );
}
