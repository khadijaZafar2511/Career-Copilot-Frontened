import ProjectOverview from "@/Components/custom-components/project-comp/ProjectOverview"
import PractiseSkills from "@/Components/custom-components/project-comp/PractiseSkills";
import ProjectTasks from "@/Components/custom-components/project-comp/ProjectTasks";
import Resource from "@/Components/custom-components/project-comp/Resource";
import SubmissionComponent from "@/Components/custom-components/project-comp/SubmissionComp"
import React, { useMemo, useState } from "react";
import {
  Clock,
  Trophy,
  Sparkles,
  LayoutDashboard,
  CheckSquare,
  BookOpen,
  Send,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button"
import { Progress } from "@/Components/ui/progress";


const projectApiResponse = {
  success: true,
  message: "Project details fetched successfully",
  data: {
    _id: "proj_101",
    roadmap: {
      roadmapId: "frontend",
      roadmapTitle: "Frontend Developer",
    },
    milestone: {
      milestoneId: "html-css",
      milestoneTitle: "HTML & CSS Fundamentals",
    },
    title: "Responsive Portfolio Website",
    slug: "responsive-portfolio-website",
    level: "Beginner",
    type: "Capstone",
    estimatedTime: {
      value: 5,
      unit: "days",
    },
    difficultyScore: 2,
    shortDescription:
      "Build a fully responsive personal portfolio website using semantic HTML and modern CSS.",
    description:
      "In this project, you will build a professional portfolio website from scratch using HTML and CSS. The goal is to practice layout building, responsiveness, and clean UI structuring while following industry-standard folder structure and best practices.",
    learningGoals: [
      "Use semantic HTML for better structure",
      "Build responsive layouts using Flexbox and Grid",
      "Implement mobile-first design approach",
      "Create reusable CSS components",
      "Deploy a project professionally",
    ],
    requirements: [
      "Must be responsive on mobile, tablet, and desktop",
      "Use semantic HTML tags (header, main, section, footer)",
      "Must include About, Skills, Projects, Contact sections",
      "Must use Flexbox and Grid at least once",
      "Deploy the project on Netlify or Vercel",
    ],
    deliverables: [
      "Landing Section (Hero + CTA)",
      "About Section",
      "Skills Section",
      "Projects Showcase Section",
      "Contact Form UI",
      "Responsive Navbar + Footer",
    ],
    skillsYouWillPractice: [
      "HTML Structure",
      "CSS Styling",
      "Flexbox",
      "Grid",
      "Responsive Design",
      "Animations",
      "Deployment",
    ],
 resources : [
  {
    _id: "res_201",
    title: "MDN HTML Guide",
    type: "reading",
    platform: "MDN",
    topic: "html",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    isFree: true,
    iconUrl: "https://cdn.simpleicons.org/html5",
  },

  {
    _id: "res_202",
    title: "MDN CSS Guide",
    type: "reading",
    platform: "MDN",
    topic: "css",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    isFree: true,
    iconUrl: "https://cdn.simpleicons.org/css",
  },

  {
    _id: "res_203",
    title: "Flexbox Complete Guide",
    type: "reading",
    platform: "CSS Tricks",
    topic: "flexbox",
    url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
    isFree: true,
    iconUrl: "https://cdn.simpleicons.org/css",
  },

  {
    _id: "res_204",
    title: "CSS Grid Crash Course",
    type: "video",
    platform: "YouTube",
    topic: "grid",
    url: "https://www.youtube.com/watch?v=jV8B24rSN5o",
    isFree: true,
    iconUrl: "https://cdn.simpleicons.org/css",
  },

  {
    _id: "res_205",
    title: "MongoDB Documentation",
    type: "docs",
    platform: "MongoDB",
    topic: "database",
    url: "https://www.mongodb.com/docs/",
    isFree: true,
    iconUrl: "https://cdn.simpleicons.org/mongodb",
  },

  {
    _id: "res_206",
    title: "React Documentation",
    type: "docs",
    platform: "React",
    topic: "react",
    url: "https://react.dev",
    isFree: true,
    iconUrl: "https://cdn.simpleicons.org/react",
  },

  {
    _id: "res_207",
    title: "Node.js Documentation",
    type: "docs",
    platform: "Node.js",
    topic: "nodejs",
    url: "https://nodejs.org/en/docs",
    isFree: true,
    iconUrl: "https://cdn.simpleicons.org/nodedotjs",
  },
],
    tasks: [
      {
        _id: "task_01",
        title: "Project Setup & Folder Structure",
        type: "practice",
        estimatedTime: { value: 1, unit: "hours" },
        description:
          "Create the project folder structure and basic HTML boilerplate. Add CSS reset and base styling.",
        resources: [
          {
            _id: "res_t01_1",
            title: "HTML Boilerplate Explained",
            type: "video",
            platform: "YouTube",
            url: "https://www.youtube.com/watch?v=UB1O30fR-EE",
            isFree: true,
          },
          {
            _id: "res_t01_2",
            title: "CSS Reset (Modern Normalize)",
            type: "reading",
            platform: "GitHub",
            url: "https://github.com/sindresorhus/modern-normalize",
            isFree: true,
          },
        ],
        status: "completed",
        progress: 100,
      },
      {
        _id: "task_02",
        title: "Design Wireframe (Figma or Paper)",
        type: "practice",
        estimatedTime: { value: 2, unit: "hours" },
        description:
          "Create a simple wireframe for your portfolio layout including navbar, hero, about, skills, projects, and contact sections.",
        resources: [
          {
            _id: "res_t02_1",
            title: "Figma Beginner Tutorial",
            type: "video",
            platform: "YouTube",
            url: "https://www.youtube.com/watch?v=FTFaQWZBqQ8",
            isFree: true,
          },
          {
            _id: "res_t02_2",
            title: "Free UI Inspiration (Behance)",
            type: "practice",
            platform: "Behance",
            url: "https://www.behance.net/",
            isFree: true,
          },
        ],
        status: "completed",
        progress: 100,
      },
      {
        _id: "task_03",
        title: "Build Navbar + Hero Section",
        type: "practice",
        estimatedTime: { value: 5, unit: "hours" },
        description:
          "Create a clean navbar and hero section using Flexbox. Ensure responsiveness with media queries.",
        resources: [
          {
            _id: "res_t03_1",
            title: "Flexbox Guide",
            type: "reading",
            platform: "CSS Tricks",
            url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
            isFree: true,
          },
          {
            _id: "res_t03_2",
            title: "Responsive Navbar Tutorial",
            type: "video",
            platform: "YouTube",
            url: "https://www.youtube.com/watch?v=PwWHL3RyQgk",
            isFree: true,
          },
        ],
        status: "in_progress",
        progress: 50,
      },
      {
        _id: "task_04",
        title: "Create About + Skills Section",
        type: "practice",
        estimatedTime: { value: 4, unit: "hours" },
        description:
          "Create about and skills section. Use CSS Grid for the skills layout and cards design.",
        resources: [
          {
            _id: "res_t04_1",
            title: "CSS Grid Guide",
            type: "reading",
            platform: "CSS Tricks",
            url: "https://css-tricks.com/snippets/css/complete-guide-grid/",
            isFree: true,
          },
          {
            _id: "res_t04_2",
            title: "CSS Grid Crash Course",
            type: "video",
            platform: "YouTube",
            url: "https://www.youtube.com/watch?v=jV8B24rSN5o",
            isFree: true,
          },
        ],
        status: "not_started",
        progress: 0,
      },
      {
        _id: "task_05",
        title: "Build Projects Showcase Section",
        type: "practice",
        estimatedTime: { value: 4, unit: "hours" },
        description:
          "Create a projects section with cards. Add hover effects and clean UI spacing.",
        resources: [
          {
            _id: "res_t05_1",
            title: "Card UI Design Inspiration",
            type: "practice",
            platform: "Dribbble",
            url: "https://dribbble.com/tags/cards",
            isFree: true,
          },
          {
            _id: "res_t05_2",
            title: "CSS Hover Effects Tutorial",
            type: "video",
            platform: "YouTube",
            url: "https://www.youtube.com/watch?v=exb2ab72Xhs",
            isFree: true,
          },
        ],
        status: "not_started",
        progress: 0,
      },
      {
        _id: "task_06",
        title: "Create Contact Section + Form UI",
        type: "practice",
        estimatedTime: { value: 3, unit: "hours" },
        description:
          "Create a contact section with a form layout. Add proper spacing, focus states, and accessibility improvements.",
        resources: [
          {
            _id: "res_t06_1",
            title: "HTML Forms Guide",
            type: "reading",
            platform: "MDN",
            url: "https://developer.mozilla.org/en-US/docs/Learn/Forms",
            isFree: true,
          },
          {
            _id: "res_t06_2",
            title: "Form UI Design Best Practices",
            type: "reading",
            platform: "Smashing Magazine",
            url: "https://www.smashingmagazine.com/2011/11/extensive-guide-web-form-usability/",
            isFree: true,
          },
        ],
        status: "not_started",
        progress: 0,
      },
      {
        _id: "task_07",
        title: "Make Full Website Responsive (Mobile First)",
        type: "practice",
        estimatedTime: { value: 5, unit: "hours" },
        description:
          "Add media queries for different screen sizes and ensure layout adapts properly on mobile/tablet/desktop.",
        resources: [
          {
            _id: "res_t07_1",
            title: "Responsive Web Design Basics",
            type: "reading",
            platform: "MDN",
            url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design",
            isFree: true,
          },
          {
            _id: "res_t07_2",
            title: "Media Queries Crash Course",
            type: "video",
            platform: "YouTube",
            url: "https://www.youtube.com/watch?v=2KL-z9A56SQ",
            isFree: true,
          },
        ],
        status: "not_started",
        progress: 0,
      },
      {
        _id: "task_08",
        title: "Add Animations & UI Polish",
        type: "practice",
        estimatedTime: { value: 3, unit: "hours" },
        description:
          "Add subtle transitions, hover animations, and smooth scrolling. Improve typography and spacing.",
        resources: [
          {
            _id: "res_t08_1",
            title: "CSS Animations Guide",
            type: "reading",
            platform: "MDN",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations",
            isFree: true,
          },
          {
            _id: "res_t08_2",
            title: "CSS Transitions Tutorial",
            type: "video",
            platform: "YouTube",
            url: "https://www.youtube.com/watch?v=Nloq6uzF8RQ",
            isFree: true,
          },
        ],
        status: "not_started",
        progress: 0,
      },
      {
        _id: "task_09",
        title: "Deploy Project (Netlify/Vercel)",
        type: "submission",
        estimatedTime: { value: 1, unit: "hours" },
        description:
          "Push code to GitHub and deploy your portfolio on Netlify or Vercel. Ensure the live link is working properly.",
        resources: [
          {
            _id: "res_t09_1",
            title: "Deploy to Netlify (Official Docs)",
            type: "reading",
            platform: "Netlify",
            url: "https://docs.netlify.com/",
            isFree: true,
          },
          {
            _id: "res_t09_2",
            title: "Vercel Deployment Guide",
            type: "reading",
            platform: "Vercel",
            url: "https://vercel.com/docs",
            isFree: true,
          },
        ],
        status: "not_started",
        progress: 0,
      },
    ],
    userProgress: {
      status: "in_progress",
      progress: 28,
      completedTasks: 2,
      totalTasks: 9,
      lastActivityAt: "2026-05-19T10:00:00Z",
      startedAt: "2026-05-15T12:00:00Z",
    },
  },
};

 const projectTabs = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard,
  },

  {
    id: "tasks",
    label: "Tasks",
    icon: CheckSquare,
  },

  {
    id: "resources",
    label: "Resources",
    icon: BookOpen,
  },

  {
    id: "submission",
    label: "Submission",
    icon: Send,
  },
];


export default function ProjectDetailsPage() {
 const [activeTab, setActiveTab] = useState("overview");

  const project = projectApiResponse.data;

  return (
    <div className="min-h-screen bg-white max-w-5xl  lg:max-w-6xl  mx-auto  md:py-8 rounded-md  md:px-8 p-2">
      <div className="max-w-5xl mx-auto ">
        {/* Header */}
        <Card className=" shadow-none  border-none rounded-none  bg-white">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-foreground ">
                  {project.title}
                </h1>

                <p className="text-slate-600 max-w-3xl">
                  {project.shortDescription}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-foreground" />
                    <span>
                      {project.estimatedTime.value} {project.estimatedTime.unit}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-foreground" />
                    <span>Difficulty Score: {project.difficultyScore}/5</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-foreground" />
                    <span>
                      Progress: {project.userProgress.progress}% (
                      {project.userProgress.completedTasks}/
                      {project.userProgress.totalTasks})
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="w-full lg:w-[320px] space-y-3">
                <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                  <span>Overall Progress</span>
                  <span>{project.userProgress.progress}%</span>
                </div>

                <Progress
                  className="*:bg-gray-300"
                  value={project.userProgress.progress}
                />

                <Button className="w-full rounded-md h-10  bg-foreground ">
                  Continue Project
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-2   border  bg-white p-2 shadow-sm">
          {projectTabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center text-gray-500  gap-2 px-4 py-2 rounded-lg transition ${
                  activeTab === tab.id
                    ? "bg-slate-200  text-foreground"
                    : "hover:bg-slate-100"
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 ">
          <div className="lg:col-span-12 space-y-6 ">
            {activeTab === "overview" && <ProjectOverview project={project} />}

            {activeTab === "tasks" && <ProjectTasks project={project} />}

            {activeTab === "resources" && <Resource project={project} />}

            {activeTab === "submission" && (
              <SubmissionComponent  />
            )}

            
          </div>
        </div>
      </div>
    </div>
  );
}