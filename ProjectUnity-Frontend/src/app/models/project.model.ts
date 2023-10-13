export interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  projectManager: {
    id: number;
    name: string;
  };
}
