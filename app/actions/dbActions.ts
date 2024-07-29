"use server"

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import PocketBase from 'pocketbase'
import { NinjaListType, NinjaType } from '../types/pbdb'
import { revalidatePath } from 'next/cache'

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

export async function updateNinjas(id: string, data: any) {
  try {
    // Get the current session
    const session = await getServerSession()

    if (!session || !session.user?.email) {
      throw new Error('Unauthorized: No valid session found');
    }

    // Fetch the ninja record
    const ninja = await pb.collection('ninjas').getOne(id) as NinjaType

    // Check if the ninja's center matches the user's email
    if (ninja.center !== session.user.email) {
      throw new Error('Unauthorized: You can only update ninjas from your center');
    }

    // Update the ninja record
    const updatedNinja = await pb.collection('ninjas').update(id, data);

    revalidatePath("/")
    return updatedNinja;
  } catch (error) {
    console.error('Error updating ninja:', error);
    throw error;
  }
}

export async function deleteNinja(id: string) {
  try {
    const session = await getServerSession()

    if (!session || !session.user?.email) {
      throw new Error("Unauthorized: No valid session found")
    }

    const ninja = await pb.collection("ninjas").getOne(id) as NinjaType

    if (ninja.center !== session.user.email) {
      throw new Error("Unauthorized: you can't delete other center's ninjas")
    }

    await pb.collection("ninjas").delete(id)

    revalidatePath("/")

  } catch (e) {
    console.error("Error deleting ninja: ", e)
    throw e
  }
}