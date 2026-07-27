import { useActiveRoadmap } from "../Features/Roadmap/Roadmap.query";
import ActiveDashboard from "@/components/custom-components/activeDashboard";
import NonActiveDashoard from "@/components/custom-components/nonActiveDashboard";
import { useCurrentUser } from "@/Features/Auth/auth.query";
export default function DashboardPage() {
  const {data:user,isLoading:isUser}=useCurrentUser()
    const { data: activeRoadmap, isLoading } = useActiveRoadmap()
  // if (isLoading || isUser) return <div> Loading Dashboard.....</div>
  return(
    <>
      {
        (activeRoadmap && user)?<ActiveDashboard activeRoadmap={activeRoadmap}/>:<NonActiveDashoard/>
     }
    </>
  )
}