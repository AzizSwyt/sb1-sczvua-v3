// Add these types to your existing types.ts file

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  dueInDays: number;
  automated: boolean;
  required: boolean;
  dependencies?: string[];
  startDate?: string;
  endDate?: string;
  progress?: number;
}

export interface TimelineEvent {
  taskId: string;
  date: string;
  type: 'start' | 'end' | 'milestone';
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
}

export interface TaskDependency {
  taskId: string;
  dependsOn: string[];
  type: 'start-to-start' | 'start-to-finish' | 'finish-to-start' | 'finish-to-finish';
}