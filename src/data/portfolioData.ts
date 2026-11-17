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
    location: "Shivamogga, Karnataka, India",
    timezone: "Asia/Kolkata",
    email: "vinayprakashvg@gmail.com",
    phone: "+91 9353642283",
    github: "https://github.com/reddyvinay0612",
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
      id: "house-price-prediction",
      title: "Bharat House Price Estimator",
      category: "Machine Learning & XAI",
      period: "Sept 2026",
      role: "Full Stack & ML Architect",
      statusBadge: "Champion R²: 98.94%",
      description: "AI-powered Indian real estate valuation platform featuring 5-fold cross-validated XGBoost/GB models (R²=98.94%), TreeSHAP explainability, What-If sensitivity simulator, and bilingual AI assistance.",
      longDescription: "An econometric property valuation and geospatial real estate intelligence platform built for Indian citizens, financial institutions, and urban planning authorities. Employs certified 5-fold cross-validated Gradient Boosting & XGBoost regressors delivering an R² of 98.94% and RMSE ₹9.73 Lakh on 13,320+ calibrated housing records. Includes TreeSHAP feature attributions ('Why This Price?'), real-time 300ms debounced sensitivity sliders with waterfall charts, interactive GIS choropleth maps, reducing-balance EMI/Rent financial crossover engines, and automated official PDF valuation certificates with QR code verification.",
      technologies: ["React 18", "FastAPI", "Python", "Scikit-Learn", "XGBoost", "Tree SHAP", "Tailwind CSS", "GIS Leaflet", "Claude AI"],
      highlights: [
        "Certified ML Champion Regressor delivering R² = 98.94% and RMSE ₹9.73 Lakh on 13,320+ calibrated Indian housing records",
        "TreeSHAP Explainable AI visualizing 'Why This Price?' feature contribution breakdowns with Simple & Expert views",
        "Real-time 300ms debounced What-If sensitivity simulator with step-by-step waterfall charts",
        "Interactive State-level GIS Choropleth Map, EMI buy-vs-rent amortization engine, and PDF valuation certificate generation"
      ],
      githubUrl: "https://github.com/reddyvinay0612/House-Price-Prediction",
      featured: true
    },
    {
      id: "camps-ml",
      title: "CAMPS-ML (Academic Monitoring & Early-Warning System)",
      category: "Machine Learning & XAI",
      period: "Nov 2026",
      role: "Lead ML & Backend Engineer",
      statusBadge: "98% Test Accuracy",
      description: "Enterprise academic monitoring platform predicting student failure and dropout risk with 98% accuracy using XGBoost, forecasting next-term SGPA trajectories (R²=0.966), and generating TreeSHAP faculty interventions.",
      longDescription: "An end-to-end institutional early-warning and academic monitoring platform designed for credit-based technical colleges (VTU/Autonomous/AICTE). Integrates continuous internal evaluations (CIE IA1–IA3), attendance, semester grades, and demographic data. Predicts student failure and dropout risk with 98% accuracy using XGBoost classification with leakage-free SMOTE, forecasts next-semester SGPA trajectories with Gradient Boosting regression (R²=0.966, MAE 0.28), and generates personalized TreeSHAP explanations to guide faculty mentorship and counseling interventions.",
      technologies: ["Python 3.10+", "Flask 3.0", "XGBoost", "Gradient Boosting", "TreeSHAP", "SQLAlchemy", "Chart.js", "Docker", "Bootstrap 5"],
      highlights: [
        "XGBoost Classifier with leakage-free SMOTE and 5-fold cross validation achieving 98% test accuracy in early failure detection",
        "Continuous next-semester SGPA trajectory regression engine yielding R² = 0.966 with low MAE (0.28)",
        "TreeSHAP Explainable AI diagnostics enabling faculty to generate targeted student intervention and counseling remarks",
        "Comprehensive role-based access control (Admin, HoD, Faculty Mentor, Student) with automated audit reports, Dockerization, and 100% pytest test suite pass rate"
      ],
      githubUrl: "https://github.com/reddyvinay0612/Centralized-Academic-Monitoring-and-Prediction-System-Using-Machine-Learning",
      featured: true
    },
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
        { name: "Python", level: 94 },
        { name: "JavaScript / TypeScript", level: 90 },
        { name: "Java", level: 88 },
        { name: "C", level: 85 },
        { name: "HTML5 & Modern CSS", level: 95 }
      ]
    },
    {
      title: "AI, ML & Explainability",
      iconName: "BrainCircuit",
      skills: [
        { name: "XGBoost & Scikit-Learn", level: 92 },
        { name: "TreeSHAP (Explainable AI)", level: 90 },
        { name: "TensorFlow / Keras (CNN)", level: 86 },
        { name: "FastAPI & Flask Services", level: 92 },
        { name: "OpenCV & Computer Vision", level: 85 }
      ]
    },
    {
      title: "Full Stack & DevOps",
      iconName: "Wrench",
      skills: [
        { name: "React 18 & Vite", level: 92 },
        { name: "Tailwind CSS & Framer Motion", level: 95 },
        { name: "SQLAlchemy & PostgreSQL", level: 86 },
        { name: "Docker & Containerization", level: 84 },
        { name: "Git & Version Control", level: 92 }
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
      description: "Developed solutions targeting sustainability and resource allocation in competitive team sprints.",
      badge: "Zonal Hack"
    },
    {
      title: "Infosys Campus Connect",
      category: "Industrial Visit",
      organization: "Infosys Development Center, Mysuru",
      duration: "1 Day",
      description: "Engaged directly with enterprise architectures, distributed delivery pipelines, and production QA methodologies.",
      badge: "Corporate Insight"
    },
    {
      title: "Full Stack Web Development",
      category: "Development Program",
      organization: "Professional Training Initiative",
      duration: "1 Month Intensive",
      description: "Mastered end-to-end full stack architecture including frontend layouts, database pipelines, and API integrations.",
      badge: "Full Stack"
    }
  ] as EventItem[],

  certifications: [
    {
      title: "Full Stack Web Development",
      issuer: "Professional Development Program",
      period: "Completed",
      description: "Intensive 1-month comprehensive training covering frontend modern interfaces, backend APIs, and SQL connectivity."
    },
    {
      title: "Enterprise Java Programming",
      issuer: "Technical Training Institute",
      period: "Completed",
      description: "Core and advanced Java, object-oriented software engineering principles, and enterprise application patterns."
    },
    {
      title: "Cybersecurity & Defenses",
      issuer: "Domain Security Program",
      period: "Completed",
      description: "Network security foundations, penetration testing awareness, and modern biometric anti-spoofing techniques."
    }
  ]
};
