import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./Pages/SingupPage";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import DashboardPage from "./Pages/DashboardPage";
import PageLayout from "./Layout/PageLayout";
import HomepageLayout from "./Layout/HomepageLayout";
import Roadmaps from "./Pages/Roadmaps";
import RoadmapDetail from "./Pages/RoadmapDetail";
import TasksPage from "./Pages/TasksPage";
import ResourcePage from "./Pages/ResourcePage";
import ProjectDetailsPage from "./Pages/ProjectDetailsPage";
import ProjectPage from "./Pages/ProjectPage";
import AImentorPage from "./Pages/AImentorPage";
import Setting from "./Pages/Setting";
import QuizPage from "./Pages/QuizPage"
import MyRoadmap from "./Pages/MyRoadmap"
import { ThemeProvider } from "@/components/custom-components/ThemeProvider"
import { ModeToggle } from "@/components/custom-components/ToggleMode";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginModal  from "./Pages/LoginPopup"
import { ProtectedRoutes } from "./Routes/Protected.route";
import { setupInterceptors } from "./Api/AxiosInterceptor";
import { queryClient } from "./Api/QueryClient";
import { Toaster } from "sonner"; 


// 2. Inject the client straight into the interceptor setup function
setupInterceptors(queryClient);
function App() {



  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* nested routes */}
            {/* <Route path="/" element={<HomepageLayout/>}> */}
            <Route
              path="/"
              element={
                <HomepageLayout>
                  <HomePage />
                </HomepageLayout>
              }
            />
            {/* </Route> */}
            <Route path="/" element={<PageLayout />}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="roadmaps" element={<Roadmaps />} />
              <Route path="roadmap/:id" element={<RoadmapDetail />} />
              <Route
                path="tasks"
                element={
                  <ProtectedRoutes>
                    <TasksPage />
                  </ProtectedRoutes>
                }
              />
              <Route path="resources" element={<ResourcePage />} />
              <Route
                path="projects/:id/detail"
                element={<ProjectDetailsPage />}
              />
              <Route path="projects" element={<ProjectPage />} />
              <Route path="mentor" element={<AImentorPage />} />
              <Route path="setting" element={<Setting />} />
              <Route path="quiz/:id" element={<QuizPage />} />
              <Route
                path="/my-roadmap"
                element={
                  <ProtectedRoutes>
                    <MyRoadmap />
                  </ProtectedRoutes>
                }
              />
            </Route>
          </Routes>
          <LoginModal />
        </BrowserRouter>
        <Toaster position="top-right" richColors closeButton theme="light" />
      </QueryClientProvider>
    </>
  );
}

export default App;
