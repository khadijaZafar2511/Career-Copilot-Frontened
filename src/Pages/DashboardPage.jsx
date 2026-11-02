import { useActiveRoadmap } from "../Features/Roadmap/Roadmap.query";
import ActiveDashboard from "@/components/custom-components/activeDashboard";
import NonActiveDashoard from "@/components/custom-components/nonActiveDashboard";
import { useCurrentUser } from "@/Features/Auth/auth.query";

export default function DashboardPage() {
  const { data: user, isLoading: isUser } = useCurrentUser();
  const { data: activeRoadmap, isPending } = useActiveRoadmap();

  // 1. Jab tak data load ho raha hai, loading screen dikhayen
  if (isPending || isUser) {
    return (
      <div className="flex flex-col mt-25 items-center justify-center">
        {/* Note: loading1.gif public folder mai hona lazmi hai */}
        <img className="h-10 w-10" src="/loading1.gif" alt="Loading..." />
        <h1 className="font-semibold text-2xl mt-15">
          Loading Dashboard ......
        </h1>
      </div>
    );
  }

  // Debugging ke liye aap check kar sakte hain ke data kya aa raha hai
  console.log("User Data:", user);
  console.log("Roadmap Data:", activeRoadmap);

  // 2. Agar user aur roadmap dono majood hain toh Active Dashboard dikhayen
  if (user && activeRoadmap) {
    return <ActiveDashboard activeRoadmap={activeRoadmap} />;
  }

  // 3. Agar roadmap nahi hai (ya undefined hai error ki wajah se), toh Non-Active Dashboard dikhayen
  return <NonActiveDashoard />;
}
