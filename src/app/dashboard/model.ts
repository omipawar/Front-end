export interface Project {
  projectName: string;
  reason: string;
  type: string;
  division: string;
  category: string;
  priority: string;
  department: string;
  startDate: Date;
  endDate: Date;
  location: string;
  status: string;
  _id: string;
}

export interface statusPayload {
  id: string;
  status: string;
}
