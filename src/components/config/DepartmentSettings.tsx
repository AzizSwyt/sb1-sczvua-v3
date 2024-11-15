import React, { useState } from 'react';
import { Building2, Plus, Trash2, Edit2, Users, Mail, Phone, Package, Search } from 'lucide-react';

interface DepartmentManager {
  name: string;
  email: string;
  phone: string;
  slack: string;
}

interface Department {
  id: string;
  name: string;
  description: string;
  manager: DepartmentManager;
  employeeCount: number;
  starterPack?: {
    devices: string[];
    apps: string[];
  };
}

const INITIAL_DEPARTMENTS: Department[] = [
  {
    id: 'engineering',
    name: 'Engineering',
    description: 'Software development and technical operations',
    manager: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      slack: '@johndoe'
    },
    employeeCount: 24,
    starterPack: {
      devices: ['MacBook Pro 16"', 'Dell 27" 4K Monitor'],
      apps: ['GitHub', 'Jira', 'Slack']
    }
  },
  {
    id: 'design',
    name: 'Design',
    description: 'Product and visual design',
    manager: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 (555) 987-6543',
      slack: '@janesmith'
    },
    employeeCount: 12,
    starterPack: {
      devices: ['MacBook Pro 14"', 'iPad Pro'],
      apps: ['Figma', 'Adobe CC', 'Slack']
    }
  }
];

export default function DepartmentSettings() {
  const [departments, setDepartments] = useState<Department[]>(INITIAL_DEPARTMENTS);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (department: Department) => {
    setEditingDepartment(department);
    setShowAddForm(true);
  };

  const handleDelete = (departmentId: string) => {
    setDepartments(departments.filter(d => d.id !== departmentId));
  };

  const handleSave = (department: Department) => {
    if (editingDepartment) {
      setDepartments(departments.map(d => 
        d.id === department.id ? department : d
      ));
    } else {
      setDepartments([...departments, { ...department, id: Date.now().toString() }]);
    }
    setShowAddForm(false);
    setEditingDepartment(null);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Departments</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage departments and their configurations
          </p>
        </div>
        <button
          onClick={() => {
            setEditingDepartment(null);
            setShowAddForm(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Department
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Department Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredDepartments.map(department => (
          <div
            key={department.id}
            className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {department.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {department.description}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(department)}
                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-gray-100 rounded-lg"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(department.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Manager Info */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-900 flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Department Manager
                  </h4>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-900">{department.manager.name}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Mail className="w-4 h-4" />
                      <span>{department.manager.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Phone className="w-4 h-4" />
                      <span>{department.manager.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Starter Pack */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-900 flex items-center">
                    <Package className="w-4 h-4 mr-2" />
                    Default Equipment
                  </h4>
                  <div className="space-y-2">
                    {department.starterPack?.devices.map((device, index) => (
                      <p key={index} className="text-sm text-gray-500">{device}</p>
                    ))}
                  </div>
                </div>

                {/* Apps & Software */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-900 flex items-center">
                    <Package className="w-4 h-4 mr-2" />
                    Default Apps
                  </h4>
                  <div className="space-y-2">
                    {department.starterPack?.apps.map((app, index) => (
                      <p key={index} className="text-sm text-gray-500">{app}</p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Team Size</dt>
                    <dd className="mt-1 text-sm text-gray-900">{department.employeeCount} members</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Slack Channel</dt>
                    <dd className="mt-1 text-sm text-gray-900">#{department.id}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Department Modal */}
      {showAddForm && (
        <DepartmentForm
          department={editingDepartment}
          onSave={handleSave}
          onCancel={() => {
            setShowAddForm(false);
            setEditingDepartment(null);
          }}
        />
      )}
    </div>
  );
}

interface DepartmentFormProps {
  department?: Department | null;
  onSave: (department: Department) => void;
  onCancel: () => void;
}

function DepartmentForm({ department, onSave, onCancel }: DepartmentFormProps) {
  const [formData, setFormData] = useState<Department>(
    department || {
      id: '',
      name: '',
      description: '',
      manager: {
        name: '',
        email: '',
        phone: '',
        slack: ''
      },
      employeeCount: 0,
      starterPack: {
        devices: [],
        apps: []
      }
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
                {department ? 'Edit Department' : 'Add Department'}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Department Name
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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

                {/* Manager Details */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-900">Manager Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={formData.manager.name}
                        onChange={(e) => setFormData({
                          ...formData,
                          manager: { ...formData.manager, name: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={formData.manager.email}
                        onChange={(e) => setFormData({
                          ...formData,
                          manager: { ...formData.manager, email: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <input
                        type="tel"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={formData.manager.phone}
                        onChange={(e) => setFormData({
                          ...formData,
                          manager: { ...formData.manager, phone: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Slack
                      </label>
                      <input
                        type="text"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={formData.manager.slack}
                        onChange={(e) => setFormData({
                          ...formData,
                          manager: { ...formData.manager, slack: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                {department ? 'Save Changes' : 'Add Department'}
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