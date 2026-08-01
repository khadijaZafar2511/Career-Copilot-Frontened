import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import HomepageLayout from "./Layout/HomepageLayout";
import PageLayout from "./Layout/PageLayout";
import { ProtectedRoutes } from "./Routes/Protected.route";
import { queryClient } from "./Api/QueryClient";
import { setupInterceptors } from "./Api/AxiosInterceptor";

// Setup axios interceptors once
setupInterceptors(queryClient);

/* -------------------- Lazy Loaded Pages -------------------- */

const SignupPage = lazy(() => import("./Pages/SingupPage"));
const LoginPage = lazy(() => import("./Pages/LoginPage"));
const HomePage = lazy(() => import("./Pages/HomePage"));
const DashboardPage = lazy(() => import("./Pages/DashboardPage"));
const Roadmaps = lazy(() => import("./Pages/Roadmaps"));
const RoadmapDetail = lazy(() => import("./Pages/RoadmapDetail"));
const TasksPage = lazy(() => import("./Pages/TasksPage"));
const ResourcePage = lazy(() => import("./Pages/ResourcePage"));
const ProjectPage = lazy(() => import("./Pages/ProjectPage"));
const ProjectDetailsPage = lazy(() => import("./Pages/ProjectDetailsPage"));
const AImentorPage = lazy(() => import("./Pages/AImentorPage"));
const Setting = lazy(() => import("./Pages/Setting"));
const QuizPage = lazy(() => import("./Pages/QuizPage"));
const MyRoadmap = lazy(() => import("./Pages/MyRoadmap"));
const LoginModal = lazy(() => import("./Pages/LoginPopup"));
const Dashboard = lazy(() => import("./Pages/admin/Dashboard"));
/* -------------------- Loading UI -------------------- */

function PageLoader() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Homepage */}
            <Route
              path="/"
              element={
                <HomepageLayout>
                  <HomePage />
                </HomepageLayout>
              }
            />

            {/* Dashboard Layout */}
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
              <Route path="projects" element={<ProjectPage />} />

              <Route
                path="projects/:id/detail"
                element={<ProjectDetailsPage />}
              />

              <Route path="mentor" element={<AImentorPage />} />
              <Route path="setting" element={<Setting />} />
              <Route path="quiz/:id" element={<QuizPage />} />

              <Route
                path="my-roadmap"
                element={
                  <ProtectedRoutes>
                    <MyRoadmap />
                  </ProtectedRoutes>
                }
              />
            </Route>

            <Route>
              <Route path="/admin/" element={<Dashboard/>} />
            </Route>
          </Routes>

          <LoginModal />
        </Suspense>
      </BrowserRouter>

      <Toaster position="top-right" richColors closeButton theme="light" />
    </QueryClientProvider>
  );
}

export default App;
