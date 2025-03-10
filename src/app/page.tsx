
import { auth } from "@clerk/nextjs/server";
import DashboardIndexPage from "./dashboard/page";
import Home from "./home";
import Settings from "./settings";
import { redirect } from 'next/navigation';


export default async function Index() {
  const { userId } = await auth()  


  if (userId) {
    redirect('/dashboard');
  }
  else return <Home />
}