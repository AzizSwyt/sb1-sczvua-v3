import React, { useState, useEffect } from 'react';
import { CheckSquare, Plus, Trash2, Filter, Calendar, Clock, Tag, AlertCircle, Link } from 'lucide-react';
import { Task } from '../types';
import TaskTimeline from './timeline/TaskTimeline';
import TaskDependencyModal from './timeline/TaskDependencyModal';

interface Props {
  data: Task[];
  updateData: (data: Task[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const TASK_CATEGORIES = ['HR', 'IT', 'Training', 'Team', 'Finance', 'Other'];

const DEFAULT_TASKS: Task[] = [
  {
    id: '1',
    title: 'Complete I-9 Form',
    description: 'Submit employment eligibility verification',
    category: 'HR',
    priority: 'high',
    status: 'pending',
    dueInDays: 3,
    automated: false,
    required: true
  },
  {
    id: '2',
    title: 'Sign Employee Handbook',
    description: 'Review and sign company policies',
    category: 'HR',
    priority: 'high',
    status: 'pending',
    dueInDays: 5,
    automated: true,
    required: true
  },
  {
    id: '3',
    title: 'Complete Security Training',
    description: 'Mandatory security awareness training',
    category: 'IT',
    priority: 'high',
    status: 'pending',
    dueInDays: 7,
    automated: true,
    required: true
  },
  {
    id: '4',
    title: 'Setup Development Environment',
    description: 'Configure local development tools and environments',
    category: 'IT',
    priority: 'high',
    status: 'pending',
    dueInDays: 2,
    automated: false,
    required: true
  },
  {
    id: '5',
    title: 'Team Introduction Meeting',
    description: 'Meet with team members and get introduced to the team',
    category: 'Team',
    priority: 'medium',
    status: 'pending',
    dueInDays: 5,
    automated: false,
    required: true
  },
  {
    id: '6',
    title: 'Setup Payroll Information',
    description: 'Complete direct deposit and tax forms',
    category: 'HR',
    priority: 'high',
    status: 'pending',
    dueInDays: 3,
    automated: true,
    required: true
  },
  {
    id: '7',
    title: 'Company Overview Training',
    description: 'Complete company overview and culture training',
    category: 'Training',
    priority: 'medium',
    status: 'pending',
    dueInDays: 10,
    automated: true,
    required: true
  },
  {
    id: '8',
    title: 'Benefits Enrollment',
    description: 'Select and enroll in company benefits',
    category: 'HR',
    priority: 'high',
    status: 'pending',
    dueInDays: 14,
    automated: false,
    required: true
  }
];

export default function TaskAssignment({ data, updateData, onNext, onBack }: Props) {
  const [tasks, setTasks] = useState<Task[]>(data);
  const [showDependencyModal, setShowDependencyModal] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');

  useEffect(() => {
    if (data.length === 0) {
      setTasks(DEFAULT_TASKS);
      updateData(DEFAULT_TASKS);
    }
  }, [data, updateData]);

  const handleDependencyUpdate = (taskId: string, dependencies: string[]) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId
        ? { ...task, dependencies }
        : task
    );
    setTasks(updatedTasks);
    updateData(updatedTasks);
    setShowDependencyModal(null);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;
    const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;
    return matchesCategory && matchesPriority;
  });

  const getProgressPercentage = () => {
    const completed = tasks.filter(task => task.status === 'completed').length;
    return Math.round((completed / tasks.length) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Overview */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Task Progress</h3>
            <p className="text-sm text-gray-500">Track completion of onboarding tasks</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-semibold text-indigo-600">{getProgressPercentage()}%</p>
            <p className="text-sm text-gray-500">
              {tasks.filter(t => t.status === 'completed').length} of {tasks.length} tasks completed
            </p>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        <select
          className="block rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {TASK_CATEGORIES.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <select
          className="block rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
        >
          <option value="all">All Priorities</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
      </div>

      {/* Tasks List */}
      <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-200">
        {filteredTasks.map(task => (
          <div key={task.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    const updatedTasks = tasks.map(t =>
                      t.id === task.id
                        ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' }
                        : t
                    );
                    setTasks(updatedTasks);
                    updateData(updatedTasks);
                  }}
                  className={`p-1 rounded-md ${
                    task.status === 'completed'
                      ? 'text-green-600 bg-green-100'
                      : 'text-gray-400 hover:text-gray-500'
                  }`}
                >
                  <CheckSquare className="w-5 h-5" />
                </button>
                <div>
                  <p className={`text-sm font-medium ${
                    task.status === 'completed'
                      ? 'text-gray-500 line-through'
                      : 'text-gray-900'
                  }`}>
                    {task.title}
                  </p>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      task.priority === 'high'
                        ? 'bg-red-100 text-red-800'
                        : task.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {task.priority}
                    </span>
                    <span className="inline-flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      Due in {task.dueInDays} days
                    </span>
                    <button
                      onClick={() => {
                        setSelectedTask(task);
                        setShowDependencyModal(task.id);
                      }}
                      className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-indigo-600"
                    >
                      <Link className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Timeline View */}
      <div className="mt-8">
        <TaskTimeline
          tasks={tasks.map(task => ({
            ...task,
            startDate: new Date(Date.now() + (task.dueInDays * 24 * 60 * 60 * 1000)).toISOString(),
            endDate: new Date(Date.now() + (task.dueInDays * 24 * 60 * 60 * 1000)).toISOString(),
            progress: task.status === 'completed' ? 100 : task.status === 'in_progress' ? 50 : 0
          }))}
          startDate={new Date().toISOString()}
          onTaskUpdate={(taskId, updates) => {
            const updatedTasks = tasks.map(task =>
              task.id === taskId
                ? { ...task, ...updates }
                : task
            );
            setTasks(updatedTasks);
            updateData(updatedTasks);
          }}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Continue
        </button>
      </div>

      {/* Dependency Modal */}
      {showDependencyModal && selectedTask && (
        <TaskDependencyModal
          task={selectedTask}
          availableTasks={tasks}
          onSave={(dependencies) => handleDependencyUpdate(selectedTask.id, dependencies)}
          onClose={() => setShowDependencyModal(null)}
        />
      )}
    </div>
  );
}