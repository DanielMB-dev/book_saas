
import { notFound } from "next/navigation";
import DayPicker from "./_components/day-picker";
import { getUser } from "./book/_actions/user";

export const dynamic = 'force-dynamic'
export const revalidate = 0


interface Props {
  params: Promise<{
    username: string
  }>;
}

export default async function UserProfilePage({ params }: Props) {
  const { username } = await params;
  const user = await getUser(username);

  if (!user || !user.username) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10 flex justify-center">
      <div className="space-y-6 max-w-2xl">
        <div className="rounded-lg border p-6 bg-white">
          <div className="flex items-center gap-4">
            <img
              src={user.imageUrl}
              alt={`${user.username}'s profile picture`}
              className="h-16 w-16 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-gray-600">@{user.username}</p>
            </div>
          </div>
        </div>

        <DayPicker username={user.username} />
      </div>
    </div>
  );
}
