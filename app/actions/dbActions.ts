"use server"

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import PocketBase from 'pocketbase'
import { NinjaListType } from '../types/pbdb'

const pb = new PocketBase("http://127.0.0.1:8090")

export async function getNinjas(): Promise<NinjaListType> {
  const session = await getServerSession()
  // console.log("server action session: ", session)
  if (!session) redirect("/")

  const results = await pb.collection("ninjas").getFullList({
    sort: 'name',
    filter: `center = "${session.user?.email}"`
  }) as NinjaListType

  return results
  // console.log(results)
}