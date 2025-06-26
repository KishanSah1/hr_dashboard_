import { Employee } from '@/types/employee';

const departments = ['Engineering', 'Marketing', 'Sales', 'Human Resources', 'Finance', 'Design'];
const positions = {
  'Engineering': ['Software Engineer', 'Senior Developer', 'Tech Lead', 'DevOps Engineer'],
  'Marketing': ['Marketing Manager', 'Content Creator', 'SEO Specialist', 'Brand Manager'],
  'Sales': ['Sales Representative', 'Account Manager', 'Sales Director', 'Business Development'],
  'Human Resources': ['HR Manager', 'Recruiter', 'HR Business Partner', 'Training Coordinator'],
  'Finance': ['Financial Analyst', 'Accountant', 'Finance Manager', 'CFO'],
  'Design': ['UI/UX Designer', 'Graphic Designer', 'Product Designer', 'Creative Director']
};

function generateMockEmployee(userData: any): Employee {
  const department = departments[Math.floor(Math.random() * departments.length)];
  const departmentPositions = positions[department as keyof typeof positions];
  const position = departmentPositions[Math.floor(Math.random() * departmentPositions.length)];
  
  return {
    id: userData.id.toString(),
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    age: userData.age,
    department,
    position,
    phone: userData.phone,
    address: {
      street: userData.address.address,
      city: userData.address.city,
      state: userData.address.state,
      country: userData.address.country,
      postalCode: userData.address.postalCode,
    },
    image: userData.image,
    rating: Math.floor(Math.random() * 5) + 1,
    bio: `Experienced ${position.toLowerCase()} with a passion for excellence and innovation. Dedicated to delivering high-quality results and contributing to team success.`,
    projects: generateProjects(),
    feedback: generateFeedback(),
    performanceHistory: generatePerformanceHistory(),
    joinDate: generateRandomDate(),
    salary: Math.floor(Math.random() * 100000) + 50000,
    skills: generateSkills(department),
    status: Math.random() > 0.1 ? 'active' : (Math.random() > 0.5 ? 'inactive' : 'onLeave'),
  };
}

function generateProjects() {
  const projectNames = [
    'Website Redesign', 'Mobile App Development', 'Marketing Campaign Q4',
    'Data Analytics Platform', 'Customer Portal', 'Internal Tools Upgrade',
    'Brand Identity Refresh', 'Sales Process Optimization'
  ];
  
  const projects = [];
  const numProjects = Math.floor(Math.random() * 4) + 1;
  
  for (let i = 0; i < numProjects; i++) {
    projects.push({
      id: `project-${i + 1}`,
      name: projectNames[Math.floor(Math.random() * projectNames.length)],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      status: ['completed', 'in-progress', 'planning'][Math.floor(Math.random() * 3)] as any,
      startDate: generateRandomDate(),
      endDate: Math.random() > 0.5 ? generateRandomDate() : undefined,
      role: ['Lead', 'Contributor', 'Consultant'][Math.floor(Math.random() * 3)],
    });
  }
  
  return projects;
}

function generateFeedback() {
  const feedback = [];
  const numFeedback = Math.floor(Math.random() * 5) + 1;
  
  const feedbackMessages = [
    'Excellent work on the recent project. Great attention to detail!',
    'Shows strong leadership skills and helps team members grow.',
    'Consistently delivers high-quality work on time.',
    'Great communication skills and collaborative approach.',
    'Innovative problem-solving and creative thinking.',
  ];
  
  for (let i = 0; i < numFeedback; i++) {
    feedback.push({
      id: `feedback-${i + 1}`,
      from: `Colleague ${i + 1}`,
      message: feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)],
      rating: Math.floor(Math.random() * 5) + 1,
      date: generateRandomDate(),
      type: ['peer', 'manager', 'subordinate'][Math.floor(Math.random() * 3)] as any,
    });
  }
  
  return feedback;
}

function generatePerformanceHistory() {
  const history = [];
  const numRecords = Math.floor(Math.random() * 3) + 2;
  
  for (let i = 0; i < numRecords; i++) {
    history.push({
      id: `perf-${i + 1}`,
      period: `Q${i + 1} 2024`,
      rating: Math.floor(Math.random() * 5) + 1,
      goals: [
        'Improve technical skills',
        'Lead team initiatives',
        'Enhance communication',
      ],
      achievements: [
        'Completed major project ahead of schedule',
        'Mentored junior team members',
        'Improved process efficiency by 20%',
      ],
      areas_for_improvement: [
        'Time management',
        'Cross-functional collaboration',
        'Technical documentation',
      ],
      date: generateRandomDate(),
    });
  }
  
  return history;
}

function generateRandomDate() {
  const start = new Date(2020, 0, 1);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

function generateSkills(department: string) {
  const skillsMap = {
    'Engineering': ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker'],
    'Marketing': ['SEO', 'Content Marketing', 'Social Media', 'Analytics', 'Copywriting'],
    'Sales': ['CRM', 'Lead Generation', 'Negotiation', 'Presentation', 'Customer Relations'],
    'Human Resources': ['Recruitment', 'Employee Relations', 'Performance Management', 'Training'],
    'Finance': ['Financial Analysis', 'Budgeting', 'Excel', 'Accounting', 'Risk Management'],
    'Design': ['Figma', 'Adobe Creative Suite', 'UI/UX', 'Prototyping', 'User Research'],
  };
  
  const departmentSkills = skillsMap[department as keyof typeof skillsMap] || [];
  const numSkills = Math.floor(Math.random() * 4) + 2;
  
  return departmentSkills.slice(0, numSkills);
}

export async function fetchEmployees(): Promise<Employee[]> {
  try {
    const response = await fetch('https://dummyjson.com/users?limit=30');
    const data = await response.json();
    
    return data.users.map(generateMockEmployee);
  } catch (error) {
    console.error('Error fetching employees:', error);
    return [];
  }
}

export async function fetchEmployeeById(id: string): Promise<Employee | null> {
  try {
    const response = await fetch(`https://dummyjson.com/users/${id}`);
    const userData = await response.json();
    
    return generateMockEmployee(userData);
  } catch (error) {
    console.error('Error fetching employee:', error);
    return null;
  }
}