import { clerkClient } from "@clerk/nextjs/server";

export async function getUser(username: string) {
  try {
    const client = await clerkClient()
    const res = await client.users.getUserList({
      username: [username],
    });

    return res?.data[0] || null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
