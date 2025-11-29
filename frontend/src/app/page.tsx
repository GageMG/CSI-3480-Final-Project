import { redirect } from 'next/navigation';

import { useDek } from '@/hooks/dek';

import { getSession } from '@/util/auth';

async function Home() {
  const { dek, setDek } = useDek();
  
  const session = await getSession();

  if (!session.isAuthenticated) {
    redirect('/login');
  }

  return (
    <div>
      <p>Hello world!</p>
      <p>DEK: {dek}</p>
    </div>
  );
}

export default Home;
