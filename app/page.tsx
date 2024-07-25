import { getServerSession } from "next-auth";
import React from 'react'

export default async function Home() {

  const session = await getServerSession()

  console.log(session)

  return (
    <div>
      Hello home page
    </div>
  );
}
