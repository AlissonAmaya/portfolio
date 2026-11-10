/* ============================================================
   data.js — THE ONLY FILE YOU NEED TO EDIT.
   Everything marked "sample: true" is placeholder content.
   Replace the text and remove the flag. Empty arrays/strings
   are fine: that section or button hides automatically.
   Dates are free text, e.g. "2022", "Mar 2024".
   ============================================================ */
const portfolioData = {
  personal: {
    name: "Alisson Fernanda Amaya Hernández",
    initials: "AA",                            // Logo + photo fallback
    title: "Student",
    location: "San salvador, El Salvador",
    email: "alissonamaya412@gmail.com",
    profileImage: "profile.png.jpeg", // Missing file? Initials are shown instead
    cv: "https://superate2014-my.sharepoint.com/:b:/g/personal/alisson_amaya2026_adoc_superate_org/IQCsw7XrvJuWTb0ZZDMTW0LsAWgj8PigLY-EtYr9cD3ohXU",                                    // e.g. "assets/documents/cv.pdf" (empty = button hidden)
    description: "Active student at the ¡Supérate! ADOC Center and the San Luis National Institute, noted for my technical proficiency in data analysis and a strong community commitment. My journey in the English language reflects a persevering and ambitious attitude, surpassing international goals through constant and disciplined self-management. A continually evolving background that combines resilience, versatility, and a genuine vocation for personal and academic excellence.",
    closing: "Thanks for visiting. Let's build something useful together."
  },

  // Any key works (github, linkedin, twitter...). Empty values are hidden.
  social: { github: "https://github.com/AlissonAmaya", linkedin: "https://sv.linkedin.com/in/alissonamaya55" },

  about: {
    paragraphs: [
      "I am passionate about helping others and making a positive difference in people's lives through healthcare."
    ],
    highlights: [
      { title: "Professional interests", text: "Nursing, patient care, healthcare and community service." },
      { title: "My academic goals", text: "Earn a Nursing degree through a scholarship granted by the Legislative Assembly of El Salvador." },
      { title: "My future aspirations", text: "Become a qualified nursing professional, provide compassionate care and contribute to my community." },
    ]
  },

  // Names only: no invented proficiency levels.
  skills: [
    { category: "Programming Languages", items: ["Python"] },
    { category: "Frontend Development", items: ["HTML5", "CSS3"] },
    { category: "Development Tools", items: ["Github", "VS Code"] },
    { category: "Microsoft tools", items: ["Excel", "Power Bi"] }
  ],

  projects: [
    { name: "Foodcheck", category: "Web", status: "Completed", image: "", tech: ["HTML5", "CSS3", "JavaScript"],
      description: "Foodcheck is an intelligent solution that scans a photo of your food to instantly determine whether it is a healthy option or not.", repo: "https://superate2014.sharepoint.com/:u:/s/Classof2026-CentroSuprateADOC/IQAX9FSEqDFDS7ryCUtacxWvAdq_dS0mbLctVMpe90l_qzE" },
    { name: "Devboost", category: "Web", status: "Completed", image: "", tech: ["HTML5", "CSS3", "JavaScript"],
      description: "Devboost is a platform aimed at young programmers entering the job market, helping them gain hands-on experience and build a solid portfolio to boost their professional development.", repo: "https://devboost.infinityfreeapp.com/" }
  ],

    education: [
    { institution: "Centro Supérate ADOC", program: "Supérate Scholarship Program",
      start: "2024", end: "", current: true,
      description: "Scholarship program focused on values, English and computer science. Program completed; awaiting graduation.",
      subjects: ["Values", "English", "Computer Science"], achievements: [] },

    { institution: "San Luis High School, Soyapango", program: "General studies",
      start: "2025", end: "2026", current: false,
      description: "High school studies completed; awaiting graduation.",
      subjects: [], achievements: [] },

    { institution: "Complejo Educativo Colonia Las Cañas", program: "Basic Education (1st to 9th grade)",
      start: "", end: "2024", current: false,
      description: "Completed basic education in El Salvador, graduating in 2024.",
      subjects: [], achievements: [] }
  ],

  // Leave as [] if you have no experience yet: a friendly note is shown instead.
  experience: [
  ],
  experienceEmptyMessage: "Professional experience will appear here. For now, my projects and studies show what I can do.",

  // type: Certification, Course, Competition, Scholarship, Recognition...
  certifications: [
    { title: "Microsoft office Excel Expert", issuer: "Centro ¡Supérate! ADOC", date: "2025", type: "Computing Certification",
      description: "Demonstrates proficiency in Microsoft Excel, including data management, spreadsheet organization, formulas, functions, and data analysis.", link: "" },
    { title: "Toeic L & R", issuer: "Centro ¡Supérate! ADOC", date: "2025", type: "English Certification",
      description: "Certifies English listening and reading comprehension skills, demonstrating the ability to understand spoken and written English in everyday and professional contexts.", link: "" }
  ]
};
