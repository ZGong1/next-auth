import { getServerSession } from "next-auth";
import React from 'react'

export default async function Home() {

  const session = await getServerSession()

  if(!session) {
    return <p>You must be signed in to access this app</p>
  }

  return (
    <div>
      Unfinished you need to sign in page
    </div>
  );
}
