

const FRONTEND_ROADMAP = {
  id: "roadmap_frontend_001",
  title: "Frontend Developer Roadmap",
  slug: "frontend-developer",
  description:
    "Step-by-step structured learning path to become a job-ready frontend developer.",
  level: "Beginner to Intermediate",
  estimatedDuration: "6 Months",

  milestones: [
    {
      id: "ms_html_css_001",
      title: "HTML + CSS (Beginner to Pro)",
      order: 1,
      description:
        "Learn complete HTML and CSS fundamentals to advanced concepts including semantic HTML, layouts, responsiveness, accessibility, animations, and modern UI building practices.",

      tasks: [
        {
          id: "task_html_001",
          title: "HTML Document Structure & Semantic Tags",
          type: "reading",
          status: "not_started",
          resources: [
            {
              type: "documentation",
              title: "MDN - HTML Basics",
              url: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics",
            },
            {
              type: "documentation",
              title: "MDN - Semantic HTML",
              url: "https://developer.mozilla.org/en-US/docs/Glossary/Semantics",
            },
          ],
        },

        {
          id: "task_html_002",
          title: "HTML Forms (Inputs, Validation, Accessibility)",
          type: "video",
          status: "not_started",
          resources: [
            {
              type: "video",
              title: "HTML Forms Full Tutorial",
              url: "https://www.youtube.com/watch?v=fNcJuPIZ2WE",
            },
            {
              type: "documentation",
              title: "MDN - HTML Forms Guide",
              url: "https://developer.mozilla.org/en-US/docs/Learn/Forms",
            },
          ],
        },

        {
          id: "task_html_003",
          title: "Practice HTML Fundamentals",
          type: "practice",
          status: "not_started",
          resources: [
            {
              type: "practice_platform",
              title: "freeCodeCamp - Responsive Web Design",
              url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
            },
            {
              type: "practice_platform",
              title: "Frontend Mentor - Beginner Challenges",
              url: "https://www.frontendmentor.io/challenges",
            },
          ],
        },

        {
          id: "task_css_001",
          title: "CSS Fundamentals (Selectors, Specificity, Box Model)",
          type: "reading",
          status: "not_started",
          resources: [
            {
              type: "documentation",
              title: "MDN - CSS First Steps",
              url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps",
            },
            {
              type: "documentation",
              title: "MDN - CSS Box Model",
              url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model",
            },
          ],
        },

        {
          id: "task_css_002",
          title: "Flexbox Layout System (Modern Layout Standard)",
          type: "video",
          status: "not_started",
          resources: [
            {
              type: "video",
              title: "Flexbox Crash Course",
              url: "https://www.youtube.com/watch?v=phWxA89Dy94",
            },
            {
              type: "documentation",
              title: "CSS Tricks - Flexbox Guide",
              url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
            },
          ],
        },

        {
          id: "task_css_003",
          title: "CSS Grid (Responsive Layouts for Modern UIs)",
          type: "reading",
          status: "not_started",
          resources: [
            {
              type: "documentation",
              title: "MDN - CSS Grid Layout",
              url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout",
            },
            {
              type: "documentation",
              title: "CSS Tricks - Grid Guide",
              url: "https://css-tricks.com/snippets/css/complete-guide-grid/",
            },
          ],
        },

        {
          id: "task_css_004",
          title: "Responsive Design (Media Queries & Mobile-First)",
          type: "video",
          status: "not_started",
          resources: [
            {
              type: "video",
              title: "Responsive Web Design Tutorial",
              url: "https://www.youtube.com/watch?v=srvUrASNj0s",
            },
            {
              type: "documentation",
              title: "MDN - Responsive Design",
              url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design",
            },
          ],
        },

        {
          id: "task_css_005",
          title: "CSS Positioning (Relative, Absolute, Sticky, Z-index)",
          type: "reading",
          status: "not_started",
          resources: [
            {
              type: "documentation",
              title: "MDN - CSS Position",
              url: "https://developer.mozilla.org/en-US/docs/Web/CSS/position",
            },
            {
              type: "article",
              title: "CSS Z-index Explained",
              url: "https://developer.mozilla.org/en-US/docs/Web/CSS/z-index",
            },
          ],
        },

        {
          id: "task_css_006",
          title: "Practice Layout Skills (Flexbox + Grid Challenges)",
          type: "practice",
          status: "not_started",
          resources: [
            {
              type: "practice_platform",
              title: "Flexbox Froggy",
              url: "https://flexboxfroggy.com/",
            },
            {
              type: "practice_platform",
              title: "Grid Garden",
              url: "https://cssgridgarden.com/",
            },
            {
              type: "practice_platform",
              title: "Frontend Mentor - Responsive Layout Projects",
              url: "https://www.frontendmentor.io/challenges",
            },
          ],
        },

        {
          id: "task_css_007",
          title: "CSS Animations & Transitions",
          type: "video",
          status: "not_started",
          resources: [
            {
              type: "video",
              title: "CSS Animations Tutorial",
              url: "https://www.youtube.com/watch?v=YszONjKpgg4",
            },
            {
              type: "documentation",
              title: "MDN - CSS Animations",
              url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations",
            },
          ],
        },

        {
          id: "task_css_008",
          title: "Accessibility Basics (ARIA, Labels, Contrast, Semantic UI)",
          type: "reading",
          status: "not_started",
          resources: [
            {
              type: "documentation",
              title: "MDN - Accessibility",
              url: "https://developer.mozilla.org/en-US/docs/Learn/Accessibility",
            },
            {
              type: "tool",
              title: "WebAIM Contrast Checker",
              url: "https://webaim.org/resources/contrastchecker/",
            },
          ],
        },

        {
          id: "task_css_009",
          title: "Build Mini UI Project (Landing Page Clone)",
          type: "practice",
          status: "not_started",
          resources: [
            {
              type: "practice_platform",
              title: "Frontend Mentor - Landing Page Challenge",
              url: "https://www.frontendmentor.io/challenges",
            },
            {
              type: "inspiration",
              title: "Dribbble Landing Page UI Inspiration",
              url: "https://dribbble.com/tags/landing_page",
            },
          ],
        },
      ],
    },
  ],

  quiz: {
    id: "quiz_frontend_001",
    title: "Frontend Developer Final Quiz",
    totalQuestions: 15,
    passingScore: 70,
    status: "locked",
    unlockCondition: "Complete all milestones tasks",
  },

  project: {
    id: "project_frontend_001",
    title: "Build Production-Level Portfolio Website",
    type: "capstone_project",
    status: "locked",
    estimatedTime: "12-15 hours",
    unlockCondition: "Complete quiz + all milestones",
  },
};

export default FRONTEND_ROADMAP;