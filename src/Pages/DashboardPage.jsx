import { useActiveRoadmap } from "../Features/Roadmap/Roadmap.query";
import ActiveDashboard from "@/components/custom-components/activeDashboard";
import NonActiveDashoard from "@/components/custom-components/nonActiveDashboard"; // Spelling: Dashoard ki sahi rakhiye jo aapki file ki hai
import { useCurrentUser } from "@/Features/Auth/auth.query";

export default function DashboardPage() {
  const { data: user, isLoading: isUser } = useCurrentUser();
  // added error parameter here to handle api failure gracefully
  const { data: activeRoadmap, isPending, isError } = useActiveRoadmap();

  if (isPending || isUser) {
    return (
      <div className="flex flex-col mt-25 items-center justify-center">
        <img className="h-10 w-10" src="/loading1.gif" alt="Loading..." />
        <h1 className="font-semibold text-2xl mt-15">
          Loading Dashboard ......
        </h1>
      </div>
    );
  }

  console.log("User Data:", user);
  console.log("Roadmap Data:", activeRoadmap);

  // Agar API fail ho gayi (jaise 404 error) ya roadmap nahi mila, toh crash hone ki bajaye NonActive dikhao
  if (isError || !activeRoadmap || !user) {
    return <NonActiveDashoard />;
  }

  return <ActiveDashboard activeRoadmap={activeRoadmap} />;
}
