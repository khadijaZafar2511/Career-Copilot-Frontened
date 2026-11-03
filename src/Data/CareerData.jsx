// src/Data/careerPaths.js

import {
  Brain,
  Code2,
  Server,
  Database,
  ShieldCheck,
  Cloud,
  Smartphone,
  Palette,
} from "lucide-react";

export const careerPaths = [
  {
    id: "6a4f8cb9a33e3801a2d283bb",

    title: "Frontend Developer",

    icon: <Code2 className="h-6 w-6 text-blue-600" />,

    category: "Web Development",

    shortDescription:
      "Build modern, responsive and interactive user interfaces using React and modern frontend technologies.",

    description:
      "Frontend developers create the user-facing part of web applications. They focus on performance, accessibility, responsive design and delivering excellent user experiences.",

    difficultyLevel: "Beginner",

    estimatedDuration: "6-8 Months",

    jobGrowth: "High",

    averageSalary: {
      min: "45,000",
      max: "90,000",
      currency: "USD/Year",
    },

    requiredSkills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Tailwind CSS",
      "Git",
    ],

    tools: ["VS Code", "GitHub", "Chrome DevTools", "Figma", "Vite"],

    roadmapTopics: [
      "HTML",
      "CSS",
      "JavaScript",
      "Responsive Design",
      "React",
      "State Management",
      "APIs",
      "Authentication",
      "Performance",
      "Deployment",
    ],

    jobTitles: ["Frontend Developer", "React Developer", "UI Developer"],

    industries: ["Software", "E-commerce", "Finance", "Healthcare"],
  },

  {
    id: "6a4f8cb9a33e3801a2d283bc",

    title: "Backend Developer",

    icon: <Server className="h-6 w-6 text-green-600" />,

    category: "Web Development",

    shortDescription:
      "Design scalable APIs, databases and server-side applications.",

    description:
      "Backend developers build secure and scalable systems that power web and mobile applications.",

    difficultyLevel: "Intermediate",

    estimatedDuration: "8-10 Months",

    jobGrowth: "Very High",

    averageSalary: {
      min: "55,000",
      max: "120,000",
      currency: "USD/Year",
    },

    requiredSkills: [
      "Node.js",
      "Express",
      "MongoDB",
      "REST APIs",
      "Authentication",
      "SQL",
    ],

    tools: ["Postman", "Docker", "MongoDB Atlas", "Git", "Redis"],

    roadmapTopics: [
      "Node.js",
      "Express",
      "Authentication",
      "MongoDB",
      "Caching",
      "Security",
      "Deployment",
    ],

    jobTitles: ["Backend Developer", "API Developer", "Node.js Developer"],

    industries: ["FinTech", "Healthcare", "SaaS", "Cloud"],
  },

  {
    id: "6a4f8cb9a33e3801a2d283bd",

    title: "Full Stack Developer",

    icon: <Database className="h-6 w-6 text-purple-600" />,

    category: "Software Engineering",

    shortDescription:
      "Develop complete web applications from frontend to backend.",

    description:
      "Full stack developers build entire web applications including frontend, backend and databases.",

    difficultyLevel: "Intermediate",

    estimatedDuration: "10-12 Months",

    jobGrowth: "Very High",

    averageSalary: {
      min: "60,000",
      max: "130,000",
      currency: "USD/Year",
    },

    requiredSkills: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "Git",
      "REST APIs",
    ],

    tools: ["VS Code", "GitHub", "Docker", "MongoDB Atlas", "Postman"],

    roadmapTopics: [
      "Frontend",
      "Backend",
      "Authentication",
      "Deployment",
      "Testing",
    ],

    jobTitles: ["Full Stack Developer", "MERN Developer", "Software Engineer"],

    industries: ["Software", "Startups", "Enterprise"],
  },

  {
    id: "6a4f8cb9a33e3801a2d283be",

    title: "AI / Machine Learning Engineer",

    icon: <Brain className="h-6 w-6 text-pink-600" />,

    category: "Artificial Intelligence",

    shortDescription:
      "Build intelligent systems using Machine Learning, Deep Learning and Generative AI.",

    description:
      "AI engineers develop models, AI-powered applications and intelligent automation solutions.",

    difficultyLevel: "Advanced",

    estimatedDuration: "12-18 Months",

    jobGrowth: "Explosive",

    averageSalary: {
      min: "80,000",
      max: "180,000",
      currency: "USD/Year",
    },

    requiredSkills: [
      "Python",
      "Machine Learning",
      "Deep Learning",
      "PyTorch",
      "TensorFlow",
      "LLMs",
    ],

    tools: ["Jupyter", "Google Colab", "PyTorch", "TensorFlow", "Hugging Face"],

    roadmapTopics: [
      "Python",
      "Math",
      "ML",
      "Deep Learning",
      "LLMs",
      "RAG",
      "AI Agents",
    ],

    jobTitles: ["AI Engineer", "ML Engineer", "Generative AI Engineer"],

    industries: ["Healthcare", "Finance", "Research", "Technology"],
  },

  {
    id: "6a4f8cb9a33e3801a2d283bf",

    title: "DevOps Engineer",

    icon: <Cloud className="h-6 w-6 text-cyan-600" />,

    category: "Cloud Computing",

    shortDescription:
      "Automate deployments, cloud infrastructure and CI/CD pipelines.",

    description:
      "DevOps engineers ensure software is delivered quickly, reliably and securely.",

    difficultyLevel: "Advanced",

    estimatedDuration: "10-12 Months",

    jobGrowth: "Very High",

    averageSalary: {
      min: "75,000",
      max: "150,000",
      currency: "USD/Year",
    },

    requiredSkills: [
      "Linux",
      "Docker",
      "Kubernetes",
      "AWS",
      "CI/CD",
      "Terraform",
    ],

    tools: ["Docker", "GitHub Actions", "Jenkins", "AWS", "Terraform"],

    roadmapTopics: ["Linux", "Containers", "Cloud", "CI/CD", "Monitoring"],

    jobTitles: ["DevOps Engineer", "Cloud Engineer"],

    industries: ["Cloud", "Finance", "Software"],
  },

];
