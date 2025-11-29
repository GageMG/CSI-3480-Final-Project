'use client'

import { useDek } from "@/hooks/dek";

function Test() {
    const { dek, setDek } = useDek();

  return <p>DEK: {dek}</p>
}

export default Test;