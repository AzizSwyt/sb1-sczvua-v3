import React, { useState } from 'react';
import { Plus, Trash2, GripVertical, CheckSquare, AlertCircle, Building2, Globe } from 'lucide-react';

interface DefaultTask {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  dueInDays: number;
  automated: boolean;
  required: boolean;
  scope: 'global' | 'department';
  departments?: string[];
}

const INITIAL_TASKS: DefaultTask[] = [
  {
    id: '1',
    title: 'Complete I-9 Form',
    description: 'Submit employment eligibility verification',
    category: 'HR',
    priority: 'high',
    dueInDays: 3,
    automated: false,
    required: true,
    scope: 'global'
  },
  {
    id: '2',
    title: 'Sign Employee Handbook',
    description: 'Review and sign company policies',
    category: 'HR',
    priority: 'high',
    dueInDays: 5,
    automated: true,
    required: true,
    scope: 'global'
  },
  {
    id: '3',
    title: 'Complete Security Training',
    description: 'Mandatory security awareness training',
    category: 'IT',
    priority: 'high',
    dueInDays: 7,
    automated: true,
    required: true,
    scope: 'global'
  },
  {
    id: '4',
    title: 'Setup Development Environment',
    description: 'Configure local development tools and environments',
    category: 'IT',
    priority: 'high',
    dueInDays: 2,
    automated: false,
    required: true,
    scope: 'department',
    departments: ['Engineering']
  }
];

const CATEGORIES = ['HR', 'IT', 'Training', 'Team', 'Finance', 'Other'];
const DEPARTMENTS = [
  'Engineering',
  'Product',
  'Design',
  'Marketing',
  'Sales',
  'Customer Success',
  'HR',
  'Finance',
  'Legal'
];

export default function DefaultTasksSettings() {
  const [tasks, setTasks] = useState<DefaultTask[]>(INITIAL_TASKS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTask, setEditingTask] = useState<DefaultTask | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedScope, setSelectedScope] = useState<'all' | 'global' | 'department'>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');

  const filteredTasks = tasks.filter(task => {
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;
    const matchesScope = selectedScope === 'all' || task.scope === selectedScope;
    const matchesDepartment = selectedDepartment === 'all' || 
      (task.departments?.includes(selectedDepartment));
    return matchesCategory && matchesScope && 
      (matchesDepartment || task.scope === 'global');
  });

  const handleDelete = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleEdit = (task: DefaultTask) => {
    setEditingTask(task);
    setShowAddForm(true);
  };

  const handleSave = (task: DefaultTask) => {
    if (editingTask) {
      setTasks(tasks.map(t => t.id === task.id ? task : t));
    } else {
      setTasks([...tasks, { ...task, id: Date.now().toString() }]);
    }
    setShowAddForm(false);
    setEditingTask(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Default Tasks</h3>
          <p className="mt-1 text-sm text-gray-500">
            Configure global and department-specific onboarding tasks
          </p>
        </div>
        <button
          onClick={() => {
            setEditingTask(null);
            setShowAddForm(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <select
          className="block rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select
          className="block rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          value={selectedScope}
          onChange={(e) => setSelectedScope(e.target.value as 'all' | 'global' | 'department')}
        >
          <option value="all">All Scopes</option>
          <option value="global">Global Tasks</option>
          <option value="department">Department Tasks</option>
        </select>

        {selectedScope !== 'global' && (
          <select
            className="block rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="all">All Departments</option>
            {DEPARTMENTS.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        )}
      </div>

      {/* Task List */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <ul className="divide-y divide-gray-200">
          {filteredTasks.map((task, index) => (
            <li
              key={task.id}
              className="p-4 hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <button className="mt-1 cursor-move text-gray-400 hover:text-gray-600">
                    <GripVertical className="w-4 h-4" />
                  </button>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
                      {task.required && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Required
                        </span>
                      )}
                      {task.automated && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Automated
                        </span>
                      )}
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        task.scope === 'global' 
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {task.scope === 'global' ? (
                          <Globe className="w-3 h-3 mr-1" />
                        ) : (
                          <Building2 className="w-3 h-3 mr-1" />
                        )}
                        {task.scope === 'global' ? 'Global' : 'Department'}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{task.description}</p>
                    <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                      <span className="inline-flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {task.category}
                      </span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        task.priority === 'high'
                          ? 'bg-red-100 text-red-800'
                          : task.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {task.priority} priority
                      </span>
                      <span>Due in {task.dueInDays} days</span>
                    </div>
                    {task.scope === 'department' && task.departments && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {task.departments.map(dept => (
                          <span
                            key={dept}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {dept}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="text-gray-400 hover:text-indigo-600"
                  >
                    <CheckSquare className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Add/Edit Task Modal */}
      {showAddForm && (
        <TaskForm
          task={editingTask}
          onSave={handleSave}
          onCancel={() => {
            setShowAddForm(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}

interface TaskFormProps {
  task?: DefaultTask | null;
  onSave: (task: DefaultTask) => void;
  onCancel: () => void;
}

function TaskForm({ task, onSave, onCancel }: TaskFormProps) {
  const [formData, setFormData] = useState<DefaultTask>(
    task || {
      id: '',
      title: '',
      description: '',
      category: 'HR',
      priority: 'medium',
      dueInDays: 7,
      automated: false,
      required: false,
      scope: 'global',
      departments: []
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {task ? 'Edit Task' : 'Add Task'}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Task Title
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      {CATEGORIES.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Priority
                    </label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value as DefaultTask['priority'] })}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Due In (Days)
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={formData.dueInDays}
                    onChange={(e) => setFormData({ ...formData, dueInDays: parseInt(e.target.value) })}
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Task Scope
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          className="form-radio text-indigo-600 focus:ring-indigo-500"
                          checked={formData.scope === 'global'}
                          onChange={() => setFormData({ ...formData, scope: 'global', departments: [] })}
                        />
                        <span className="ml-2 text-sm text-gray-700">Global Task</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          className="form-radio text-indigo-600 focus:ring-indigo-500"
                          checked={formData.scope === 'department'}
                          onChange={() => setFormData({ ...formData, scope: 'department', departments: [] })}
                        />
                        <span className="ml-2 text-sm text-gray-700">Department Task</span>
                      </label>
                    </div>
                  </div>

                  {formData.scope === 'department' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Departments
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {DEPARTMENTS.map(dept => (
                          <label key={dept} className="flex items-center">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              checked={formData.departments?.includes(dept) || false}
                              onChange={(e) => {
                                const departments = formData.departments || [];
                                setFormData({
                                  ...formData,
                                  departments: e.target.checked
                                    ? [...departments, dept]
                                    : departments.filter(d => d !== dept)
                                });
                              }}
                            />
                            <span className="ml-2 text-sm text-gray-700">{dept}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      checked={formData.automated}
                      onChange={(e) => setFormData({ ...formData, automated: e.target.checked })}
                    />
                    <span className="ml-2 text-sm text-gray-700">Automated Task</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      checked={formData.required}
                      onChange={(e) => setFormData({ ...formData, required: e.target.checked })}
                    />
                    <span className="ml-2 text-sm text-gray-700">Required Task</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                {task ? 'Save Changes' : 'Add Task'}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}