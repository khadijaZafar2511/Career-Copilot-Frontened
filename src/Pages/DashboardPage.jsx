import { useActiveRoadmap } from "../Features/Roadmap/Roadmap.query";
import ActiveDashboard from "@/components/custom-components/activeDashboard";
import NonActiveDashoard from "@/components/custom-components/nonActiveDashboard";
import { useCurrentUser } from "@/Features/Auth/auth.query";
export default function DashboardPage() {
  const {data:user,isLoading:isUser}=useCurrentUser()
    const { data: activeRoadmap, isPending} = useActiveRoadmap()
  if (isPending || isUser)
    return (
      <div className="  flex  flex-col mt-25 items-center justify-center ">
        <img className="h-10 w-10" src="/loading1.gif" />
        <h1 className="font-semibold text-2xl mt-15">
          Loading Dashboard ......
        </h1>
      </div>
    );
  console.log(user,activeRoadmap)
  return(
    <>
      {
        (activeRoadmap && user)?<ActiveDashboard activeRoadmap={activeRoadmap}/>:<NonActiveDashoard/>
     }
    </>
  )
}