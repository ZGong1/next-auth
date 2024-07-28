import { getServerSession } from "next-auth";
import React from 'react'
import NinjaList from "./components/NinjaList";
import { getNinjas } from "./actions/dbActions";
import type { NinjaListType } from "./types/pbdb";

export default async function Home() {

  const session = await getServerSession()

  if(!session) {
    return <p>You must be signed in to access this app</p>
  }

  const ninjaList = await getNinjas() as NinjaListType
  // console.log("ninjaList in page.tsx: ", ninjaList)
  return (
    <NinjaList ninjaList={ninjaList} />

    // Page (server)
    //  <NinjaList> (client) (has search bar in this component)
    //    <Ninja>
    //  
  );
}
