import { redirect } from 'next/navigation';

import RegisterForm from '@/components/RegisterForm/RegisterForm';

import { getSession } from '@/util/auth';

async function RegisterPage() {
  const session = await getSession();

  if (session.isAuthenticated) {
    redirect('/');
  }

  return (
    <div>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
