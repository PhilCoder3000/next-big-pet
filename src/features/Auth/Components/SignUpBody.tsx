import React, { useState } from 'react';
import { BaseTextField } from '../../../shared/fields/BaseTextField';
import { PasswordTextField } from '../../../shared/fields/PasswordTextField';

interface SignUpBodyProps {
  uuid?: string;
}

export function SignUpBody({ uuid }: SignUpBodyProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    }
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };
  return (
    <>
      <BaseTextField
        placeholder="name"
        name="name"
        value={name}
        onChange={changeHandler}
      />
      <BaseTextField
        placeholder="email"
        name="email"
        value={email}
        onChange={changeHandler}
      />
      <PasswordTextField
        placeholder="password"
        name="password"
        value={password}
        onChange={changeHandler}
      />
    </>
  );
}
