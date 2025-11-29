'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { pbkdf2Sync } from 'pbkdf2';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/Field';

import { register } from '@/actions/auth';

import { useDek } from '@/hooks/dek';

import { isValidEmail, passwordMeetsRequirements, randomString } from '@/util/string';
import { encryptDek, getKek } from '@/util/client-auth';

interface Errors {
  email: string;
  password: string;
  confirmPassword: string;
  form: string;
}

function RegisterForm() {
  const { dek, setDek } = useDek();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({
    email: '',
    password: '',
    confirmPassword: '',
    form: ''
  });
  const [registerDisabled, setRegisterDisabled] = useState(true);

  async function handleRegister() {
    let hasErrors = false;
    const foundErrors: Errors = {
      email: '',
      password: '',
      confirmPassword: '',
      form: ''
    };

    if (!isValidEmail(email)) {
      foundErrors.email = 'Please enter a valid email address.';
      hasErrors = true;
    }
    if (!passwordMeetsRequirements(password)) {
      foundErrors.password = 'Password must be at least 8 characters and contain 1 number.';
      hasErrors = true;
    }
    if (password !== confirmPassword) {
      foundErrors.confirmPassword = 'Passwords do not match.';
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(foundErrors);
      return;
    }

    const salt = randomString(32);
    const verifier = pbkdf2Sync(password, salt, 1, 32).toString('hex');
    const kek = await getKek(password, salt);
    const dek = randomString(32);
    const encDek = encryptDek(dek, kek);

    const registerStatus = await register(email, salt, verifier, encDek);
    if (registerStatus === 201) {
      setDek(dek);
      redirect('/');
    } else if (registerStatus === 409) {
      foundErrors.email = 'An account with this email already exists.';
    } else {
      foundErrors.form = 'Registration failed. Please try again.';
    }
    setErrors(foundErrors);
  }

  useEffect(() => {
    if (!email || !password || !confirmPassword) {
      setRegisterDisabled(true);
      return;
    }
    setRegisterDisabled(false);
  }, [email, password, confirmPassword]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register for an account</CardTitle>
        <CardDescription>
          Already have an account?
          {' '}
          <Link href='/login'>Log in</Link>
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <FieldGroup>
          <Field data-invalid={errors.email !== ''}>
            <FieldLabel htmlFor='email'>Email</FieldLabel>
            <Input
              placeholder='Email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              id='email'
            />
            <FieldError>{errors.email}</FieldError>
          </Field>
          <Field data-invalid={errors.password !== ''}>
            <FieldLabel htmlFor='password'>Password</FieldLabel>
            <Input
              placeholder='Password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type='password'
              id='password'
            />
            <FieldError>{errors.password}</FieldError>
          </Field>
          <Field data-invalid={errors.confirmPassword !== ''}>
            <FieldLabel htmlFor='confirmPassword'>Confirm Password</FieldLabel>
            <Input
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              type='password'
              id='confirmPassword'
            />
            <FieldError>{errors.confirmPassword}</FieldError>
          </Field>
          <FieldError>{errors.form}</FieldError>
          <Field>
            <Button onClick={handleRegister} disabled={registerDisabled}>
              Register
            </Button>
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}

export default RegisterForm;
