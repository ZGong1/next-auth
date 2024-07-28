import { getServerSession } from "next-auth";
import React from 'react'
import NinjaList from "./components/NinjaList";

export default async function Home() {

  const session = await getServerSession()

  if(!session) {
    return <p>You must be signed in to access this app</p>
  }

  return (
    <NinjaList/>

    // Page (server)
    //  <NinjaList> (client) (has search bar in this component)
    //    <Ninja>
    //  
  );
}
