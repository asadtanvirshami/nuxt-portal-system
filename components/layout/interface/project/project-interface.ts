export interface Link {
  url: string;
  description: string;
}
export interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  status: string;
  phase: string;
  serial_number: string;
  deadline: Date;
  approved: boolean;
  active: boolean;
  projectInfos: ProjectInfos[];
  services: Service[];
  milestones: Milestone[];
  user: User[];
  start_date: Date | null;
  end_date: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectDetail {
  id: string;
  title: string;
  description: string;
  budget: number;
  status: string;
  phase: string;
  serial_number: string;
  deadline: Date;
  approved: boolean;
  active: boolean;
  start_date: Date | null;
  end_date: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Milestone {
  id: string;
  project: string;
  title: string;
  description: string;
  amount: number;
  dueDate: Date;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectInfos {
  links: Array<{ url: string; description: string }>;
  meeting_link: string;
  project_manager_email: string;
  project_manager_name: string;
  project_manager_phone: string;
  completion_percentage: number;
  dueDate: Date;
  note: string;
  project: string;
}

export interface Service {
  service_name: string;
  project: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profile_picture: string;
  blocked: boolean;
}
