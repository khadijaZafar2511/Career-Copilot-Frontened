import { useMemo } from "react";
import { useState } from "react";
import {
  Users,
  BookOpen,
  FolderGit2,
    ClipboardList,
    ClipboardCheck,
    ChevronRight ,
  TrendingUp,
  Search,
  Bell,
  ShieldCheck,
  Settings,
  BrainCircuit,
  ArrowUpRight,
  ArrowDownRight,
  Clock3,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Library,
  Plus,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarFallback,AvatarImage } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Progress } from "@/components/ui/progress";

import { Separator } from "@/components/ui/separator";


import { CircularProgressbar, buildStyles } from "react-circular-progressbar";



import "react-circular-progressbar/dist/styles.css";


const growth = [
  { month: "Jan", users: 420 },
  { month: "Feb", users: 650 },
  { month: "Mar", users: 910 },
  { month: "Apr", users: 1250 },
  { month: "May", users: 1680 },
  { month: "Jun", users: 2200 },
  { month: "Jul", users: 2840 },
  { month: "Aug", users: 3380 },
  { month: "Sep", users: 4020 },
  { month: "Oct", users: 4910 },
  { month: "Nov", users: 5730 },
  { month: "Dec", users: 6540 },
];
const recentUsers = [
  {
    id: 1,
    name: "Ali Hassan",
    email: "ali@gmail.com",
    roadmap: "AI Engineer",
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Khan",
    email: "sarah@gmail.com",
    roadmap: "Frontend Developer",
    status: "Learning",
  },
  {
    id: 3,
    name: "Ahmed Ali",
    email: "ahmed@gmail.com",
    roadmap: "Backend Developer",
    status: "Paused",
  },
  {
    id: 4,
    name: "Fatima Noor",
    email: "fatima@gmail.com",
    roadmap: "DevOps Engineer",
    status: "Active",
  },
  {
    id: 5,
    name: "Usman Khan",
    email: "usman@gmail.com",
    roadmap: "AI Engineer",
    status: "Completed",
  },
];
const stats = [
  {
    title: "Total Users",
    value: "8,426",
    growth: "+12%",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    title: "Roadmaps",
    value: "18",
    growth: "+3",
    icon: BookOpen,
    color: "bg-violet-500",
  },
  {
    title: "Projects",
    value: "74",
    growth: "+9%",
    icon: FolderGit2,
    color: "bg-emerald-500",
  },
  {
    title: "Quiz Attempts",
    value: "1,482",
    growth: "+18%",
    icon: ClipboardCheck,
    color: "bg-orange-500",
  },
  {
    title: "AI Requests",
    value: "23K",
    growth: "+28%",
    icon: BrainCircuit,
    color: "bg-pink-500",
  },
  {
    title: "Revenue",
    value: "£12,430",
    growth: "+11%",
    icon: TrendingUp,
    color: "bg-cyan-500",
  },
];

const pendingProjects = [
  {
    title: "AI Career Mentor Platform",
    user: "Ali",
    submitted: "2 hours ago",
  },
  {
    title: "E-commerce Dashboard",
    user: "Ahmed",
    submitted: "Yesterday",
  },
];

const activities = [
  {
    type: "success",
    title: "New user completed Frontend Roadmap",
    time: "5 minutes ago",
  },
  {
    type: "pending",
    title: "Project submission waiting for review",
    time: "25 minutes ago",
  },
  {
    type: "info",
    title: "New roadmap resource added",
    time: "1 hour ago",
  },
  {
    type: "success",
    title: "Quiz milestone approved",
    time: "3 hours ago",
  },
  {
    type: "pending",
    title: "AI Career Mentor project submitted",
    time: "Yesterday",
  },
];
export default function Dashboard() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ---------------- HEADER ---------------- */}
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
          {/* Left */}

          <div className="flex items-center gap-10">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Career Copilot
              </h1>

              <p className="text-sm text-slate-500">Admin Dashboard</p>
            </div>

            <div className="relative hidden lg:block">
              <Search className="absolute left-4 top-3 h-5 w-5 text-slate-400" />

              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users, projects..."
                className="w-[360px] rounded-xl border-slate-200 bg-slate-100 pl-12"
              />
            </div>
          </div>

          {/* Right */}

          <div className="flex items-center gap-5">
            <Button variant="outline" className="rounded-xl">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Button>

            <Avatar className="h-11 w-11">
              <AvatarImage src="" />

              <AvatarFallback className="bg-blue-600 text-white">
                KZ
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      {/* ---------------- BODY ---------------- */}
      <main className="mx-auto max-w-7xl md:p-8 p-2">
        {/* ---------------- HERO ---------------- */}

        <Card className="overflow-hidden rounded-3xl border-0 bg-foreground text-white shadow-xl">
          <div className="flex flex-col justify-between gap-10 md:p-10 p-5 lg:flex-row">
            {/* Left */}

            <div className="max-w-3xl">
              <Badge className="mb-5 bg-white/20 text-white hover:bg-white/20">
                <Sparkles className="mr-2 h-4 w-4" />
                Career Copilot Platform
              </Badge>

              <h2 className="md:text-3xl text-2xl font-bold leading-tight">
                Welcome Back,
                <br />
                KZ 
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-blue-100">
                Monitor platform health, manage users, review projects, publish
                learning content and track overall growth from one modern
                dashboard.
              </p>

              <div className="mt-10 flex gap-4">
                <Button
                  size="lg"
                  className="rounded-xl bg-white text-blue-700 hover:bg-slate-100"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Create Roadmap
                </Button>

                <Button
                  size="lg"
                  variant="secondary"
                  className="rounded-xl border-white/20 bg-white/10 text-white hover:bg-white/20"
                >
                  View Reports
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Right */}

            <div className="grid w-full max-w-sm gap-5 p-8">
              <Card className="rounded-2xl border-0 bg-white/10 p-6 text-white backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-100">System Status</p>

                    <h3 className="mt-2 text-3xl font-bold">Healthy</h3>
                  </div>

                  <ShieldCheck className="h-10 w-10" />
                </div>
              </Card>

              <Card className="rounded-2xl border-0 bg-white/10 p-6 text-white backdrop-blur-xl">
                <p className="text-sm text-blue-100">Active Users Today</p>

                <h3 className="mt-3 text-4xl font-bold">5,324</h3>

                <p className="mt-2 text-blue-100">
                  +8.4% compared to yesterday
                </p>
              </Card>
            </div>
          </div>
        </Card>

        {/* KPI Cards start in Part 2 */}
      </main>
      {/* ==========================================================
                    KPI SECTION
========================================================== */}
      <section className="mt-8 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">
              Platform Overview
            </h3>

            <p className="mt-1 text-slate-500">
              Real-time insights about your Career Copilot platform.
            </p>
          </div>

          <Button variant="outline" className="rounded-xl">
            Export Analytics
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.title}
                className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
              >
                {/* Top */}

                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {item.title}
                    </p>

                    <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
                      {item.value}
                    </h2>
                  </div>

                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.color} shadow-lg transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                </div>

                {/* Bottom */}

                <div className="mt-8 flex items-center justify-between">
                  <Badge className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
                    ↑ {item.growth}
                  </Badge>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-xl text-slate-500 hover:text-blue-600"
                  >
                    Details
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
      ;
      {/* ==========================================================
                  QUICK ACTIONS
========================================================== */}
      <section className="mt-10 p-6">
        <div className="grid gap-6 lg:grid-cols-4">
          <Card className="rounded-3xl border-0 bg-blue-600 p-7 text-white shadow-xl">
            <BookOpen className="h-10 w-10" />

            <h3 className="mt-5 text-xl font-semibold">Publish Roadmap</h3>

            <p className="mt-2 text-blue-100">
              Create a new learning roadmap for students.
            </p>

            <Button className="mt-8 w-full rounded-xl bg-white text-blue-700 hover:bg-slate-100">
              Create
            </Button>
          </Card>

          <Card className="rounded-3xl p-7 transition-all hover:shadow-lg">
            <Users className="h-10 w-10 text-violet-600" />

            <h3 className="mt-5 text-xl font-semibold">Manage Users</h3>

            <p className="mt-2 text-slate-500">
              Suspend, activate or inspect learner profiles.
            </p>

            <Button variant="outline" className="mt-8 w-full rounded-xl">
              Open
            </Button>
          </Card>

          <Card className="rounded-3xl p-7 transition-all hover:shadow-lg">
            <FolderGit2 className="h-10 w-10 text-emerald-600" />

            <h3 className="mt-5 text-xl font-semibold">Review Projects</h3>

            <p className="mt-2 text-slate-500">
              Check newly submitted student projects.
            </p>

            <Button variant="outline" className="mt-8 w-full rounded-xl">
              Review
            </Button>
          </Card>

          <Card className="rounded-3xl p-7 transition-all hover:shadow-lg">
            <BrainCircuit className="h-10 w-10 text-pink-600" />

            <h3 className="mt-5 text-xl font-semibold">AI Assistant</h3>

            <p className="mt-2 text-slate-500">
              Monitor AI usage and future integrations.
            </p>

            <Button variant="outline" className="mt-8 w-full rounded-xl">
              Open
            </Button>
          </Card>
        </div>
      </section>
      ;
      {/* ==========================================================
                    ANALYTICS
========================================================== */}
      <section className="mt-10 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">
              Analytics Overview
            </h3>

            <p className="mt-1 text-slate-500">
              Live platform metrics and growth insights.
            </p>
          </div>

          <Badge className="rounded-full bg-blue-50 px-4 py-2 text-blue-700">
            Updated 2 min ago
          </Badge>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* ===========================================
              USER GROWTH CHART
    =========================================== */}

          <Card className="col-span-2 rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">User Growth</p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">+32%</h2>

                <p className="mt-1 text-sm text-emerald-600">
                  Compared to last month
                </p>
              </div>

              <Badge className="rounded-full bg-emerald-50 text-emerald-700">
                Excellent
              </Badge>
            </div>

            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growth}>
                  <defs>
                    <linearGradient id="growth" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="#2563EB"
                        stopOpacity={0.45}
                      />

                      <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" vertical={false} />

                  <XAxis dataKey="month" tickLine={false} axisLine={false} />

                  <YAxis tickLine={false} axisLine={false} />

                  <Tooltip />

                  <Area
                    dataKey="users"
                    stroke="#2563EB"
                    strokeWidth={4}
                    fill="url(#growth)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* ===========================================
              PLATFORM HEALTH
    =========================================== */}

          <Card className="rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Platform Health</p>

                <h3 className="mt-2 text-3xl font-bold">99.98%</h3>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
                <ShieldCheck className="h-8 w-8 text-emerald-600" />
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm text-slate-500">API Uptime</span>

                  <span className="font-semibold">99%</span>
                </div>

                <Progress value={99} />
              </div>

              <div>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm text-slate-500">Database</span>

                  <span className="font-semibold">97%</span>
                </div>

                <Progress value={97} />
              </div>

              <div>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm text-slate-500">Storage</span>

                  <span className="font-semibold">82%</span>
                </div>

                <Progress value={82} />
              </div>

              <div>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm text-slate-500">AI Services</span>

                  <span className="font-semibold">95%</span>
                </div>

                <Progress value={95} />
              </div>
            </div>
          </Card>
        </div>
      </section>
      ;
      {/* ==========================================================
                SECOND ANALYTICS ROW
========================================================== */}
      <section className="mt-6 p-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* ==========================================
            WEEKLY ACTIVE USERS
    ========================================== */}

          <Card className="rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Weekly Active Users</p>

                <h2 className="mt-2 text-3xl font-bold">5,324</h2>
              </div>

              <Badge className="bg-emerald-50 text-emerald-700">+14%</Badge>
            </div>

            <div className="mt-8 space-y-5">
              <div>
                <div className="flex justify-between text-sm">
                  <span>Monday</span>

                  <span>76%</span>
                </div>

                <Progress value={76} />
              </div>

              <div>
                <div className="flex justify-between text-sm">
                  <span>Tuesday</span>

                  <span>82%</span>
                </div>

                <Progress value={82} />
              </div>

              <div>
                <div className="flex justify-between text-sm">
                  <span>Wednesday</span>

                  <span>91%</span>
                </div>

                <Progress value={91} />
              </div>

              <div>
                <div className="flex justify-between text-sm">
                  <span>Thursday</span>

                  <span>88%</span>
                </div>

                <Progress value={88} />
              </div>

              <div>
                <div className="flex justify-between text-sm">
                  <span>Friday</span>

                  <span>94%</span>
                </div>

                <Progress value={94} />
              </div>
            </div>
          </Card>

          {/* ==========================================
            ROADMAP PERFORMANCE
    ========================================== */}

          <Card className="rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Popular Roadmaps</p>

                <h2 className="mt-2 text-2xl font-bold">Top Categories</h2>
              </div>

              <BookOpen className="text-blue-600" />
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span>AI Engineer</span>

                  <span>92%</span>
                </div>

                <Progress value={92} />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span>Frontend</span>

                  <span>81%</span>
                </div>

                <Progress value={81} />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span>Backend</span>

                  <span>73%</span>
                </div>

                <Progress value={73} />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span>DevOps</span>

                  <span>59%</span>
                </div>

                <Progress value={59} />
              </div>
            </div>
          </Card>

          {/* ==========================================
            SYSTEM STATUS
    ========================================== */}

          <Card className="rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Live Services</p>

                <h2 className="mt-2 text-2xl font-bold">Operational</h2>
              </div>

              <div className="h-4 w-4 rounded-full bg-green-500 animate-pulse" />
            </div>

            <div className="mt-8 space-y-5">
              <div className="flex items-center justify-between">
                <span>Authentication</span>

                <Badge className="bg-green-100 text-green-700">Online</Badge>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span>Database</span>

                <Badge className="bg-green-100 text-green-700">Healthy</Badge>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span>Storage</span>

                <Badge className="bg-green-100 text-green-700">Running</Badge>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span>Email Service</span>

                <Badge className="bg-yellow-100 text-yellow-700">Delayed</Badge>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span>AI API</span>

                <Badge className="bg-green-100 text-green-700">Online</Badge>
              </div>
            </div>
          </Card>
        </div>
      </section>
      ;
      {/* ==========================================================
                USERS + PROJECT REVIEWS
========================================================== */}
      <section className="mt-8 p-6">
        <div className="grid gap-6 xl:grid-cols-3">
          {/* ======================================================
                    RECENT USERS
    ====================================================== */}

          <Card className="xl:col-span-2 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between border-b px-7 py-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  Recent Users
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Latest learners joining Career Copilot.
                </p>
              </div>

              <Button variant="outline">View All</Button>
            </div>

            <div className="divide-y">
              {recentUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between px-7 py-5 transition hover:bg-slate-50"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-blue-600 text-white">
                        {user.name[0]}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h4 className="font-semibold">{user.name}</h4>

                      <p className="text-sm text-slate-500">{user.email}</p>
                    </div>
                  </div>

                  <Badge variant="secondary">{user.roadmap}</Badge>

                  <Badge
                    className={
                      user.status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : user.status === "Learning"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-orange-100 text-orange-700"
                    }
                  >
                    {user.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* ======================================================
                  PROJECT REVIEWS
    ====================================================== */}

          <Card className="rounded-3xl border border-slate-200 shadow-sm">
            <div className="border-b px-6 py-6">
              <h3 className="text-xl font-semibold">Pending Reviews</h3>

              <p className="mt-1 text-sm text-slate-500">
                Student submissions waiting for approval.
              </p>
            </div>

            <div className="space-y-5 p-6">
              {pendingProjects.map((project, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 p-5 transition hover:border-blue-200 hover:shadow-md"
                >
                  <Badge className="mb-4 bg-orange-100 text-orange-700">
                    Pending
                  </Badge>

                  <h4 className="font-semibold">{project.title}</h4>

                  <p className="mt-1 text-sm text-slate-500">
                    Submitted by
                    <span className="font-medium text-slate-700">
                      {" "}
                      {project.user}
                    </span>
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      {project.submitted}
                    </span>

                    <Button size="sm" className="rounded-xl">
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
      ;
      {/* ==========================================================
                ACTIVITY + QUICK ACTIONS
========================================================== */}
      <section className="mt-8 p-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* ===========================================
              ACTIVITY TIMELINE
    =========================================== */}

          <Card className="lg:col-span-2 rounded-3xl border border-slate-200 shadow-sm">
            <div className="border-b px-7 py-6">
              <h3 className="text-xl font-semibold">Recent Activity</h3>

              <p className="mt-1 text-sm text-slate-500">
                Everything happening across the platform.
              </p>
            </div>

            <div className="p-7 space-y-7">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-start gap-5">
                  <div
                    className={`mt-1 flex h-11 w-11 items-center justify-center rounded-2xl
              ${
                activity.type === "success"
                  ? "bg-emerald-100"
                  : activity.type === "pending"
                    ? "bg-orange-100"
                    : "bg-blue-100"
              }`}
                  >
                    {activity.type === "success" && (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    )}

                    {activity.type === "pending" && (
                      <Clock3 className="h-5 w-5 text-orange-600" />
                    )}

                    {activity.type === "info" && (
                      <Bell className="h-5 w-5 text-blue-600" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900">
                      {activity.title}
                    </h4>

                    <p className="mt-1 text-sm text-slate-500">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* ===========================================
              QUICK ACTIONS
    =========================================== */}

          <Card className="rounded-3xl border border-slate-200 shadow-sm">
            <div className="border-b px-6 py-6">
              <h3 className="text-xl font-semibold">Quick Actions</h3>
            </div>

            <div className="space-y-4 p-6">
              <Button className="h-12 w-full justify-start rounded-xl">
                <Plus className="mr-3 h-5 w-5" />
                Create Roadmap
              </Button>

              <Button
                variant="outline"
                className="h-12 w-full justify-start rounded-xl"
              >
                <Users className="mr-3 h-5 w-5" />
                Manage Users
              </Button>

              <Button
                variant="outline"
                className="h-12 w-full justify-start rounded-xl"
              >
                <FolderGit2 className="mr-3 h-5 w-5" />
                Review Projects
              </Button>

              <Button
                variant="outline"
                className="h-12 w-full justify-start rounded-xl"
              >
                <BookOpen className="mr-3 h-5 w-5" />
                Add Resources
              </Button>

              <Button
                variant="outline"
                className="h-12 w-full justify-start rounded-xl"
              >
                <BrainCircuit className="mr-3 h-5 w-5" />
                AI Settings
              </Button>
            </div>
          </Card>
        </div>
      </section>
      ;
      {/* ==========================================================
                  SYSTEM SUMMARY
========================================================== */}
      <section className="mt-8 mb-12 p-6">
        <Card className="rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl">
          <div className="flex flex-col items-center justify-between gap-8 px-10 py-10 lg:flex-row">
            <div>
              <Badge className="bg-white/20 text-white hover:bg-white/20">
                Career Copilot
              </Badge>

              <h2 className="mt-5 text-3xl font-bold">
                Platform running smoothly 🚀
              </h2>

              <p className="mt-3 max-w-2xl text-slate-300">
                Everything looks healthy today. Keep monitoring analytics,
                review submitted projects, publish new learning content, and
                continue improving the learning experience.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur">
                <h3 className="text-4xl font-bold">99.98%</h3>

                <p className="mt-2 text-sm text-slate-300">Uptime</p>
              </div>

              <div className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur">
                <h3 className="text-4xl font-bold">8.4k</h3>

                <p className="mt-2 text-sm text-slate-300">Active Users</p>
              </div>
            </div>
          </div>
        </Card>
      </section>
      ;
    </div>
  );
}
