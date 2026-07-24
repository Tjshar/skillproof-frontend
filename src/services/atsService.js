const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const atsService = {
  scoreResume: async (jdText) => {
    await delay(2000);
    // const response = await api.post('/ats/score', { jdText });
    // return response.data;
    return {
      atsScore: 73,
      missingKeywords: ['Kubernetes', 'CI/CD', 'Agile', 'Scrum'],
      polishedResume: `ALEX JOHNSON\nFrontend Developer | React Specialist\n\nPROFESSIONAL SUMMARY\nResults-driven Frontend Developer with 2+ years of experience building responsive web applications using React, TypeScript, and modern JavaScript frameworks. Proven track record of delivering high-quality code and collaborating in Agile teams. Strong problem-solving skills and passion for creating exceptional user experiences.\n\nTECHNICAL SKILLS\n• Frontend: React, TypeScript, JavaScript, HTML5, CSS3, Redux\n• Backend: Node.js, Express, MongoDB\n• Tools: Git, Docker, AWS, CI/CD pipelines\n• Methodologies: Agile, Scrum, Test-Driven Development\n\nEXPERIENCE\nFrontend Developer Intern | Tech Startup Inc\nJan 2023 - Jun 2023 (6 months)\n• Developed and maintained responsive web applications using React and TypeScript\n• Collaborated with cross-functional teams in Agile sprints\n• Implemented CI/CD pipelines for automated testing and deployment\n• Reduced page load time by 40% through performance optimization\n\nOpen Source Contributor | Various Projects\n2022 - Present\n• Active contributor to popular React and Node.js open-source projects\n• Implemented features and fixed bugs across multiple repositories\n• Gained experience with Git workflows and code review processes\n\nEDUCATION\nB.Tech in Computer Science | State University\nExpected Graduation: 2024\n\nPROJECTS\nDashboard v2 | React, Node.js, MongoDB\nModern analytics dashboard with real-time data visualization\n• 45+ GitHub stars\n• Implemented responsive design and dark mode\n• Integrated RESTful APIs and WebSocket for live updates`
    };
  }
};
