export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  department: string;
  position: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  image: string;
  rating: number;
  bio: string;
  projects: Project[];
  feedback: FeedbackItem[];
  performanceHistory: PerformanceRecord[];
  joinDate: string;
  salary: number;
  skills: string[];
  status: 'active' | 'inactive' | 'onLeave';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planning';
  startDate: string;
  endDate?: string;
  role: string;
}

export interface FeedbackItem {
  id: string;
  from: string;
  message: string;
  rating: number;
  date: string;
  type: 'peer' | 'manager' | 'subordinate';
}

export interface PerformanceRecord {
  id: string;
  period: string;
  rating: number;
  goals: string[];
  achievements: string[];
  areas_for_improvement: string[];
  date: string;
}

export interface Department {
  id: string;
  name: string;
  color: string;
}

export interface CreateEmployeeData {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  phone: string;
  salary: number;
  skills: string[];
}