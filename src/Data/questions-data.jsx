const assessmentQuestions = [
  {
    _id: "q1",
    section: "career_discovery",
    order: 1,
    question: "What type of work sounds most exciting to you?",
    type: "single_choice",
    required: true,
    options: [
      {
        _id: "o1",
        text: "Building websites and user interfaces",
        careerMappings: [
          { careerId: "career_frontend", weight: 5 },
          { careerId: "career_fullstack", weight: 3 },
        ],
      },
      {
        _id: "o2",
        text: "Building APIs and backend systems",
        careerMappings: [
          { careerId: "career_backend", weight: 5 },
          { careerId: "career_fullstack", weight: 3 },
        ],
      },
      {
        _id: "o3",
        text: "Working with data and finding insights",
        careerMappings: [
          { careerId: "career_data_science", weight: 5 },
          { careerId: "career_ai_ml", weight: 3 },
        ],
      },
      {
        _id: "o4",
        text: "Training AI models and intelligent systems",
        careerMappings: [
          { careerId: "career_ai_ml", weight: 5 },
          { careerId: "career_data_science", weight: 3 },
        ],
      },
      {
        _id: "o5",
        text: "Managing cloud infrastructure and deployments",
        careerMappings: [{ careerId: "career_devops", weight: 5 }],
      },
      {
        _id: "o6",
        text: "Protecting systems from security threats",
        careerMappings: [{ careerId: "career_cybersecurity", weight: 5 }],
      },
    ],
  },

  {
    _id: "q2",
    section: "career_discovery",
    order: 2,
    question: "Which project excites you the most?",
    type: "single_choice",
    required: true,
    options: [
      {
        _id: "o1",
        text: "E-commerce website",
        careerMappings: [
          { careerId: "career_frontend", weight: 3 },
          { careerId: "career_fullstack", weight: 5 },
        ],
      },
      {
        _id: "o2",
        text: "Social media backend system",
        careerMappings: [{ careerId: "career_backend", weight: 5 }],
      },
      {
        _id: "o3",
        text: "AI chatbot",
        careerMappings: [{ careerId: "career_ai_ml", weight: 5 }],
      },
      {
        _id: "o4",
        text: "Data analytics dashboard",
        careerMappings: [{ careerId: "career_data_science", weight: 5 }],
      },
      {
        _id: "o5",
        text: "Cloud deployment platform",
        careerMappings: [{ careerId: "career_devops", weight: 5 }],
      },
      {
        _id: "o6",
        text: "Security monitoring tool",
        careerMappings: [{ careerId: "career_cybersecurity", weight: 5 }],
      },
    ],
  },

  {
    _id: "q3",
    section: "career_discovery",
    order: 3,
    question: "What do you enjoy most while working on a task?",
    type: "single_choice",
    required: true,
    options: [
      {
        _id: "o1",
        text: "Designing user interfaces",
        careerMappings: [
          { careerId: "career_frontend", weight: 5 },
          { careerId: "career_uiux", weight: 5 },
        ],
      },
      {
        _id: "o2",
        text: "Solving coding problems",
        careerMappings: [
          { careerId: "career_backend", weight: 4 },
          { careerId: "career_fullstack", weight: 4 },
        ],
      },
      {
        _id: "o3",
        text: "Finding patterns in data",
        careerMappings: [
          { careerId: "career_data_science", weight: 5 },
          { careerId: "career_ai_ml", weight: 4 },
        ],
      },
      {
        _id: "o4",
        text: "Automating systems",
        careerMappings: [{ careerId: "career_devops", weight: 5 }],
      },
      {
        _id: "o5",
        text: "Testing system security",
        careerMappings: [{ careerId: "career_cybersecurity", weight: 5 }],
      },
    ],
  },

  {
    _id: "q4",
    section: "career_discovery",
    order: 4,
    question: "What motivates you the most?",
    type: "single_choice",
    required: true,
    options: [
      {
        _id: "o1",
        text: "Creativity and design",
        careerMappings: [
          { careerId: "career_frontend", weight: 3 },
          { careerId: "career_uiux", weight: 5 },
        ],
      },
      {
        _id: "o2",
        text: "Building useful products",
        careerMappings: [
          { careerId: "career_fullstack", weight: 5 },
          { careerId: "career_backend", weight: 3 },
        ],
      },
      {
        _id: "o3",
        text: "Problem solving",
        careerMappings: [
          { careerId: "career_backend", weight: 4 },
          { careerId: "career_fullstack", weight: 4 },
        ],
      },
      {
        _id: "o4",
        text: "Innovation and research",
        careerMappings: [{ careerId: "career_ai_ml", weight: 5 }],
      },
      {
        _id: "o5",
        text: "Efficiency and automation",
        careerMappings: [{ careerId: "career_devops", weight: 5 }],
      },
      {
        _id: "o6",
        text: "Security and reliability",
        careerMappings: [{ careerId: "career_cybersecurity", weight: 5 }],
      },
    ],
  },

  {
    _id: "q5",
    section: "career_discovery",
    order: 5,
    question: "How do you feel about mathematics and logical thinking?",
    type: "single_choice",
    required: true,
    options: [
      {
        _id: "o1",
        text: "I love it",
        careerMappings: [
          { careerId: "career_ai_ml", weight: 5 },
          { careerId: "career_data_science", weight: 5 },
        ],
      },
      {
        _id: "o2",
        text: "I enjoy it",
        careerMappings: [
          { careerId: "career_backend", weight: 3 },
          { careerId: "career_fullstack", weight: 3 },
        ],
      },
      {
        _id: "o3",
        text: "I'm okay with it",
        careerMappings: [{ careerId: "career_frontend", weight: 2 }],
      },
      {
        _id: "o4",
        text: "I prefer less math",
        careerMappings: [{ careerId: "career_uiux", weight: 3 }],
      },
    ],
  },

  {
    _id: "q6",
    section: "career_discovery",
    order: 6,
    question: "Which tech area interests you most?",
    type: "single_choice",
    required: true,
    options: [
      {
        _id: "o1",
        text: "Web Development",
        careerMappings: [
          { careerId: "career_frontend", weight: 4 },
          { careerId: "career_fullstack", weight: 4 },
        ],
      },
      {
        _id: "o2",
        text: "Artificial Intelligence",
        careerMappings: [{ careerId: "career_ai_ml", weight: 5 }],
      },
      {
        _id: "o3",
        text: "Data Analytics",
        careerMappings: [{ careerId: "career_data_science", weight: 5 }],
      },
      {
        _id: "o4",
        text: "Cloud Computing",
        careerMappings: [{ careerId: "career_devops", weight: 5 }],
      },
      {
        _id: "o5",
        text: "Cybersecurity",
        careerMappings: [{ careerId: "career_cybersecurity", weight: 5 }],
      },
      {
        _id: "o6",
        text: "UI/UX Design",
        careerMappings: [{ careerId: "career_uiux", weight: 5 }],
      },
    ],
  },

  {
    _id: "q7",
    section: "career_discovery",
    order: 7,
    question: "If you join a startup, what role feels most natural?",
    type: "single_choice",
    required: true,
    options: [
      {
        _id: "o1",
        text: "Build user-facing applications",
        careerMappings: [
          { careerId: "career_frontend", weight: 4 },
          { careerId: "career_uiux", weight: 3 },
        ],
      },
      {
        _id: "o2",
        text: "Build backend systems and APIs",
        careerMappings: [{ careerId: "career_backend", weight: 5 }],
      },
      {
        _id: "o3",
        text: "Work on AI features",
        careerMappings: [{ careerId: "career_ai_ml", weight: 5 }],
      },
      {
        _id: "o4",
        text: "Analyze business data",
        careerMappings: [{ careerId: "career_data_science", weight: 5 }],
      },
      {
        _id: "o5",
        text: "Manage infrastructure",
        careerMappings: [{ careerId: "career_devops", weight: 5 }],
      },
      {
        _id: "o6",
        text: "Handle security",
        careerMappings: [{ careerId: "career_cybersecurity", weight: 5 }],
      },
    ],
  },

  {
    _id: "q8",
    section: "career_discovery",
    order: 8,
    question: "What impact do you want to make?",
    type: "single_choice",
    required: true,
    options: [
      {
        _id: "o1",
        text: "Create great user experiences",
        careerMappings: [
          { careerId: "career_frontend", weight: 4 },
          { careerId: "career_uiux", weight: 5 },
        ],
      },
      {
        _id: "o2",
        text: "Build scalable systems",
        careerMappings: [
          { careerId: "career_backend", weight: 4 },
          { careerId: "career_fullstack", weight: 4 },
        ],
      },
      {
        _id: "o3",
        text: "Use data to drive decisions",
        careerMappings: [{ careerId: "career_data_science", weight: 5 }],
      },
      {
        _id: "o4",
        text: "Advance AI technology",
        careerMappings: [{ careerId: "career_ai_ml", weight: 5 }],
      },
      {
        _id: "o5",
        text: "Ensure system reliability",
        careerMappings: [{ careerId: "career_devops", weight: 5 }],
      },
      {
        _id: "o6",
        text: "Protect organizations from threats",
        careerMappings: [{ careerId: "career_cybersecurity", weight: 5 }],
      },
    ],
  },
];

export default assessmentQuestions;
