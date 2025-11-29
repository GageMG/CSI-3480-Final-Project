import { redirect } from 'next/navigation';

import NavBar from '@/components/NavBar/NavBar';
import PasswordManager from '@/components/PasswordManager/PasswordManager';

import { getSession } from '@/util/auth';

async function Home() {
  const session = await getSession();

  if (!session.isAuthenticated) {
    redirect('/login');
  }

  return (
    <div className='flex h-full'>
      <NavBar />
      <PasswordManager />
    </div>
  );
}

export default Home;
