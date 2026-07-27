
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Login from  "@/components/custom-components/Login"
import { useLocation, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Read where the user came from, or default to the dashboard
  const fromPage = location.state?.from?.pathname || "/dashboard";

  const handleSuccess = () => {
    navigate(fromPage, { replace: true });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-3  py-5">
      <Card className="w-full max-w-md shadow-lg px-2">
        <CardHeader>
          <CardTitle className="text-xl  font-semibold text-center">
            Create your Career Copilot account
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Login onLoginSuccess={handleSuccess} />
        </CardContent>
      </Card>
    </div>
  );
}

