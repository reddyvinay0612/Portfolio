export interface Project {
  id: string;
  title: string;
  category: string;
  period: string;
  role?: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  highlights: string[];
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
  statusBadge?: string;
}

export interface Education {
  institution: string;
  location: string;
  degree: string;
  graduation: string;
  gpa: string;
  concentrations: string[];
  coursework: string[];
}

export interface EventItem {
  title: string;
  category: 'Hackathon' | 'Development Program' | 'Industrial Visit';
  organization: string;
  duration?: string;
  description: string;
  badge?: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: { name: string; level?: number; icon?: string }[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "VINAYPRAKASH",
    shortName: "Vinay",
    title: "Computer Science & Design Engineer",
    tagline: "Crafting intelligent AI systems & high-impact digital experiences",
    about: "Computer Science and Design student at PES Institute of Technology & Management with a solid 8.02 GPA. Passionate about building AI-powered web applications, FinTech security solutions, and intuitive user interfaces.",
    location: "Shivammogga, Karnataka, India",
    timezone: "Asia/Kolkata",
    email: "vinayprakashvg@gmail.com",
    phone: "+91 9353642283",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    spokenLanguages: ["English", "Kannada", "Hindi"]
  },

  education: {
    institution: "PES INSTITUTE OF TECHNOLOGY AND MANAGEMENT",
    location: "Shivamogga, Karnataka",
    degree: "B.E. in Computer Science and Design",
    graduation: "Expected Graduation, June 2027",
    gpa: "8.02 / 10.00",
    concentrations: ["Technology", "Design"],
    coursework: [
      "Data Structures & Algorithms",
      "Object Oriented Design",
      "Object-Oriented Programming",
      "Web Technologies",
      "Database Systems"
    ]
  } as Education,

  projects: [
    {
      id: "fintech-security",
      title: "Domain(FinTech) HackFest",
      category: "FinTech & AI Security",
      period: "July 2026",
      statusBadge: "Next-Gen Defense",
      description: "Pioneering financial security system addressing biometric spoofing by Agentic AI that mimics human speech, typing patterns, and biometric navigation.",
      longDescription: "Traditional financial security methods (passwords, 2FA, facial recognition) are becoming vulnerable to Agentic AI capable of mimicking human voice, keystrokes, and biometric gestures. Built a preventive security layer that detects synthetic biometric signals and halts fraud prior to fund transfer.",
      technologies: ["Agentic AI", "Python", "Biometric Fraud Analysis", "FinTech Security"],
      highlights: [
        "Pre-transaction active threat detection",
        "Agentic AI voice & keystroke mimicry counter-measures",
        "Proactive transaction blocking before fund transfers"
      ],
      featured: true
    },
    {
      id: "student-resource-hub",
      title: "Student Resource Hub",
      category: "Full Stack & AI",
      period: "Nov 2024",
      role: "Team Lead",
      statusBadge: "Hackathon Winner",
      description: "Collaborative educational platform with secure user auth, study material repository, and an adaptive AI chatbot for interactive learning.",
      longDescription: "Led a software team to build a web platform streamlining access to study materials. Features role-based access, upload/download capabilities, and an integrated AI assistant that adapts explanation styles to student comprehension.",
      technologies: ["HTML", "CSS", "JavaScript", "SQL Database", "AI Chatbot API"],
      highlights: [
        "Served as Team Lead coordinating UI & backend integration",
        "Integrated interactive adaptive AI Chatbot for 24/7 learning support",
        "Organized study materials with instant search & filter"
      ],
      featured: true
    },
    {
      id: "skin-analyzer",
      title: "AI Skin Condition Analyzer & Skincare Recommendation",
      category: "Deep Learning & Computer Vision",
      period: "Completed",
      statusBadge: "Computer Vision",
      description: "AI-based web app detecting skin conditions from facial images using CNNs, OpenCV, MediaPipe, and Flask to deliver personalized skincare regimens.",
      longDescription: "Developed a computer vision system that extracts facial regions using OpenCV and MediaPipe landmark detection, passes cropped regions into a Convolutional Neural Network (CNN) trained with Keras/TensorFlow, and presents custom treatment suggestions via a Flask web dashboard.",
      technologies: ["Python", "TensorFlow / Keras", "CNN", "OpenCV", "MediaPipe", "Flask"],
      highlights: [
        "Facial feature & landmark extraction using MediaPipe & OpenCV",
        "High-accuracy CNN model for multi-condition classification",
        "Personalized skincare regimen recommendation engine"
      ],
      featured: true
    },
    {
      id: "smart-energy",
      title: "Smart Energy & Carbon Emission Optimization System",
      category: "AI & Sustainability",
      period: "Ongoing Major Project",
      statusBadge: "Major Project",
      description: "AI energy management platform monitoring electricity usage in real-time, predicting appliance carbon emissions, and rendering cost reduction insights.",
      longDescription: "Ongoing major engineering project building an intelligent dashboard for real-time energy monitoring. Utilizes machine learning models to forecast future power spikes, calculates appliance-level carbon footprints, and suggests smart automated energy saving strategies.",
      technologies: ["Python", "Machine Learning", "Data Analytics", "Interactive Dashboard", "IoT Data Stream"],
      highlights: [
        "Real-time electricity monitoring & analytics dashboard",
        "ML usage prediction models to curb energy spikes",
        "Appliance-level carbon footprint estimation & cost reduction tips"
      ],
      featured: true
    }
  ] as Project[],

  skillCategories: [
    {
      title: "Programming Languages",
      iconName: "Code",
      skills: [
        { name: "C", level: 85 },
        { name: "Java", level: 90 },
        { name: "Python", level: 92 },
        { name: "HTML & CSS", level: 95 },
        { name: "JavaScript", level: 88 }
      ]
    },
    {
      title: "AI, ML & Vision",
      iconName: "BrainCircuit",
      skills: [
        { name: "TensorFlow / Keras", level: 85 },
        { name: "OpenCV", level: 88 },
        { name: "MediaPipe", level: 84 },
        { name: "Flask", level: 86 },
        { name: "Machine Learning (CNN)", level: 88 }
      ]
    },
    {
      title: "Frameworks & Developer Tools",
      iconName: "Wrench",
      skills: [
        { name: "Bootstrap", level: 90 },
        { name: "VS Code", level: 95 },
        { name: "SQL & Databases", level: 82 },
        { name: "Git & Web Tech", level: 85 }
      ]
    }
  ] as SkillCategory[],

  eventsAndVisits: [
    {
      title: "NMAMIT, Karkala",
      category: "Hackathon",
      organization: "NMAM Institute of Technology",
      duration: "36 Hours",
      description: "Participated in a 36-hour National-Level Hackathon presenting the FinTech Security project.",
      badge: "National Level"
    },
    {
      title: "MCE, Hassan",
      category: "Hackathon",
      organization: "Malnad College of Engineering",
      duration: "6 Hours",
      description: "State-level rapid hackathon competing in innovative software solution design.",
      badge: "State Level"
    },
    {
      title: "JNNCE Sigma 2024",
      category: "Hackathon",
      organization: "JNN College of Engineering, Shivamogga",
      duration: "2024",
      description: "Inter-collegiate technical hackathon showcase.",
      badge: "Regional"
    },
    {
      title: "BOSCH Vocational Center, Bengaluru",
      category: "Industrial Visit",
      organization: "BOSCH Vocational Center",
      description: "Skill development training in Industrial Immersion on Industry 4.0 solutions & IoT systems.",
      badge: "Industry 4.0 / IoT"
    },
    {
      title: "SERC, IISc Bangalore",
      category: "Industrial Visit",
      organization: "Supercomputer Education and Research Centre (SERC)",
      description: "Supercomputing exposure gaining experience with high-performance computing (HPC) infrastructure and cutting-edge applications.",
      badge: "Supercomputing / HPC"
    }
  ] as EventItem[],

  certifications: [
    {
      title: "Full Stack Web Development",
      issuer: "MINDENIOUS",
      period: "April 2025 – May 2025",
      description: "Comprehensive certificate training covering modern full-stack web architectures, frontend frameworks, database management, and API design."
    },
    {
      title: "Java for Enterprise: Developing Robust Solutions",
      issuer: "Student Development Program",
      period: "Completed",
      description: "In-depth training on enterprise Java applications, Object-Oriented Architecture, and scalable software solutions."
    },
    {
      title: "Unlocking Cyber Security: Basics to Advanced Techniques",
      issuer: "Student Development Program",
      period: "Completed",
      description: "Hands-on program covering modern cyber security principles, network defense, threat modeling, and ethical hacking fundamentals."
    }
  ]
};
