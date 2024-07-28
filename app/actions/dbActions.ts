"use server"

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import PocketBase from 'pocketbase'

const pb = new PocketBase("http://127.0.0.1:8090")

export async function getNinjas() {
  const session = getServerSession()
  console.log("server action session: ", session)
  if (!session) redirect("/")

  const results = await pb.collection("ninjas").getFullList()
  console.log(results)
}