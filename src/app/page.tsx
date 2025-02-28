
import { auth } from "@clerk/nextjs/server";
import DashboardIndexPage from "./dashboard/page";
import Home from "./home";
import Settings from "./settings";



export default async function Index() {
  const { userId } = await auth()  


  if (userId) return <Settings/>
  else return <Home />
}