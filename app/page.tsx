import { getServerSession } from "next-auth";
import React from 'react'
import NinjaPage from "./components/NinjaPage";

export default async function Home() {

  const session = await getServerSession()

  if(!session) {
    return <p>You must be signed in to access this app</p>
  }

  return (
    <NinjaPage/>


    // make this client, + footer component here so search bar can affect  // put it in ninjalist footer
    // Ninja page (client)
    //    Ninja list (server)
    //    top centered (client)
    // </NinjaPage>
  );
}
