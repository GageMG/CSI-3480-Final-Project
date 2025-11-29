'use client';

import { useDek } from '@/hooks/dek';
import { useUser } from '@/hooks/user';

function Test() {
  const { dek, setDek } = useDek();
  const { guid, setGuid } = useUser();

  return (
    <div>
      <p>GUID: {guid}</p>
      <p>DEK: {dek}</p>
    </div>
  );
}

export default Test;
