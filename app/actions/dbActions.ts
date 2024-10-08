"use server"

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import PocketBase from 'pocketbase'
import { NinjaListType, NinjaType, UserConfig } from '../types/pbdb'
import { revalidatePath } from 'next/cache'

const pb = new PocketBase("http://127.0.0.1:8090")

async function LIRReset(email: string) {
  const cancelKey = 'updateNinjasIceFieldAndLIR' + Date.now();


  try {
      // Fetch all records from the "ninjas" collection
      const records = await pb.collection('ninjas').getFullList({
        filter: `center = "${email}"`,
        $cancelKey: cancelKey
      });
      console.log(records)

      // Update each record
      for (const record of records) {
        await pb.collection('ninjas').update(record.id, {
            ice: true
        }, {
            $cancelKey: cancelKey
        });
    }


        // Update the LIR field in the "config" collection
        const currentDate = new Date().toISOString();
        const configRecord = await pb.collection('config').getFirstListItem(`email="${email}"`);
        
        await pb.collection('config').update(configRecord.id, {
            LIR: currentDate
        });

      console.log('All "ice" fields updated successfully')
  } catch (error) {
      console.error('Error updating records:', error);
  }
}

async function createDefaultConfig(email: string): Promise<UserConfig> {
  const now = new Date().toISOString()
  const newConfig = {
    email: email,
    LIR: now
  }

  try {
    const createdConfig = await pb.collection("config").create(newConfig)
    return newConfig
  } catch (error) {
    console.error("Error creating default config:", error)
    throw error
  }
}

export async function getNinjas(): Promise<NinjaListType> {
  // check if valid session
  const session = await getServerSession()
  if (!session) redirect("/")

  // get config and LIR reset if required
  try {
    const userConfig = await pb.collection("config").getFirstListItem(`email="${session.user?.email}"`) as UserConfig
    const lastReset = userConfig.LIR.slice(5, 7)
    const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, '0');
    if (lastReset != currentMonth) {
      await LIRReset(session.user?.email!)
      revalidatePath("/")
    }
  } catch (error) {
    createDefaultConfig(session.user?.email!)
  } 

  // get list of ninjas
  const results = await pb.collection("ninjas").getFullList({
    sort: 'name',
    filter: `center = "${session.user?.email}"`
  }) as NinjaListType

  return results
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

export async function createNinja(name: string, bucks: number) {
  try {
    const session = await getServerSession()

    if (!session || !session.user?.email) {
      throw new Error("Unauthorized: you have to be signed in to create a ninja profile")
    }

    const data = {
      "name": name,
      "belt": "white",
      "bucks": bucks,
      "center": session.user.email,
      "ice": true,
      "imgNum": Math.floor(Math.random() * 20),
      "llu": "N/A",
    }

    await pb.collection("ninjas").create(data)
    revalidatePath("/")

  } catch (e) {
    console.error("Error in createNinja server action: \n", e)
    throw e
  }
}