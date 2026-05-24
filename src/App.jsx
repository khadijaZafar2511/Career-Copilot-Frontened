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


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/singup" element={<SignupPage />} />
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
            <Route path="roadmaps/:slug" element={<RoadmapDetail />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="resources" element={<ResourcePage />} />
            <Route path="projects/:slug" element={<ProjectDetailsPage />} />
            <Route path="projects" element={<ProjectPage />} />
            <Route path="mentor" element={<AImentorPage />} />
           
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
