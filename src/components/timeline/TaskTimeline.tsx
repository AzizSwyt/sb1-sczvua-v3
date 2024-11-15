import React from 'react';
import { Calendar, Clock, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { Task } from '../../types';

interface TimelineTask extends Task {
  startDate: string;
  endDate: string;
  dependencies?: string[];
  progress: number;
}

interface Props {
  tasks: TimelineTask[];
  startDate: string;
  onTaskUpdate: (taskId: string, updates: Partial<TimelineTask>) => void;
}

export default function TaskTimeline({ tasks, startDate, onTaskUpdate }: Props) {
  // Calculate timeline dates
  const timelineDates = getTimelineDates(startDate, tasks);
  
  // Sort tasks by dependencies
  const sortedTasks = sortTasksByDependencies(tasks);

  const getTaskStatus = (task: TimelineTask) => {
    if (task.status === 'completed') return 'completed';
    if (task.dependencies?.some(depId => 
      !tasks.find(t => t.id === depId)?.status === 'completed'
    )) return 'blocked';
    if (task.status === 'in_progress') return 'in_progress';
    return 'pending';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      case 'blocked': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">Task Timeline</h3>
        <div className="flex items-center space-x-4">
          <span className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            Start Date: {new Date(startDate).toLocaleDateString()}
          </span>
          <button className="text-sm text-indigo-600 hover:text-indigo-700">
            Export Schedule
          </button>
        </div>
      </div>

      {/* Timeline Header */}
      <div className="flex mb-4">
        <div className="w-1/3 pr-4">
          <h4 className="text-sm font-medium text-gray-700">Task</h4>
        </div>
        <div className="w-2/3 flex">
          {timelineDates.map(date => (
            <div
              key={date}
              className="flex-1 px-2 text-center text-sm text-gray-500"
            >
              {new Date(date).toLocaleDateString(undefined, { 
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Tasks */}
      <div className="space-y-3">
        {sortedTasks.map(task => {
          const status = getTaskStatus(task);
          const startIndex = timelineDates.indexOf(task.startDate);
          const endIndex = timelineDates.indexOf(task.endDate);
          const duration = endIndex - startIndex + 1;
          
          return (
            <div key={task.id} className="flex items-center">
              <div className="w-1/3 pr-4">
                <div className="flex items-start">
                  <div className={`w-2 h-2 mt-2 rounded-full ${getStatusColor(status)}`} />
                  <div className="ml-2">
                    <p className="text-sm font-medium text-gray-900">{task.title}</p>
                    <div className="flex items-center mt-1">
                      {task.dependencies?.length > 0 && (
                        <span className="inline-flex items-center mr-2 text-xs text-gray-500">
                          <ArrowRight className="w-3 h-3 mr-1" />
                          {task.dependencies.length} dependencies
                        </span>
                      )}
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        task.priority === 'high'
                          ? 'bg-red-100 text-red-800'
                          : task.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-2/3 flex relative">
                <div
                  className="absolute h-6 rounded-lg transition-all duration-200"
                  style={{
                    left: `${(startIndex / timelineDates.length) * 100}%`,
                    width: `${(duration / timelineDates.length) * 100}%`,
                    backgroundColor: status === 'completed' 
                      ? '#10B981' 
                      : status === 'in_progress'
                      ? '#3B82F6'
                      : status === 'blocked'
                      ? '#EF4444'
                      : '#E5E7EB',
                    opacity: status === 'blocked' ? 0.5 : 1
                  }}
                >
                  <div
                    className="h-full bg-white opacity-25"
                    style={{ width: `${task.progress}%` }}
                  />
                  {status === 'blocked' && (
                    <span className="absolute inset-0 flex items-center justify-center text-white">
                      <AlertCircle className="w-4 h-4" />
                    </span>
                  )}
                  {status === 'completed' && (
                    <span className="absolute inset-0 flex items-center justify-center text-white">
                      <CheckCircle className="w-4 h-4" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-6">
          <span className="flex items-center text-sm text-gray-600">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
            Completed
          </span>
          <span className="flex items-center text-sm text-gray-600">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
            In Progress
          </span>
          <span className="flex items-center text-sm text-gray-600">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
            Blocked
          </span>
          <span className="flex items-center text-sm text-gray-600">
            <div className="w-3 h-3 rounded-full bg-gray-300 mr-2" />
            Pending
          </span>
        </div>
      </div>
    </div>
  );
}

// Helper function to get all dates between start and end
function getTimelineDates(startDate: string, tasks: TimelineTask[]): string[] {
  const dates = new Set<string>();
  dates.add(startDate);
  
  tasks.forEach(task => {
    dates.add(task.startDate);
    dates.add(task.endDate);
  });

  return Array.from(dates).sort();
}

// Helper function to sort tasks based on dependencies
function sortTasksByDependencies(tasks: TimelineTask[]): TimelineTask[] {
  const sorted: TimelineTask[] = [];
  const visited = new Set<string>();

  function visit(task: TimelineTask) {
    if (visited.has(task.id)) return;
    
    if (task.dependencies) {
      task.dependencies.forEach(depId => {
        const depTask = tasks.find(t => t.id === depId);
        if (depTask) visit(depTask);
      });
    }

    visited.add(task.id);
    sorted.push(task);
  }

  tasks.forEach(task => visit(task));
  return sorted;
}