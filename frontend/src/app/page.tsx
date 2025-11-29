import { redirect } from 'next/navigation';

import { getSession } from '@/util/auth';
import Test from '@/components/Test';

async function Home() {
  const session = await getSession();

  if (!session.isAuthenticated) {
    redirect('/login');
  }

  return (
    <div>
      <p>Hello world!</p>
      <Test />
    </div>
  );
}

export default Home;
