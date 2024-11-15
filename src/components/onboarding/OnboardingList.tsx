import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Users, Calendar, Package, AppWindow } from 'lucide-react';

interface OnboardingEmployee {
  id: string;
  name: string;
  role: string;
  department: string;
  startDate: string;
  status: 'pending' | 'in_progress' | 'completed';
  progress: {
    devices: number;
    apps: number;
    total: number;
  };
}

const MOCK_EMPLOYEES: OnboardingEmployee[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    role: 'Frontend Developer',
    department: 'Engineering',
    startDate: '2024-03-15',
    status: 'in_progress',
    progress: {
      devices: 2,
      apps: 5,
      total: 10
    }
  },
  {
    id: '2',
    name: 'Bob Wilson',
    role: 'UI Designer',
    department: 'Design',
    startDate: '2024-03-20',
    status: 'pending',
    progress: {
      devices: 0,
      apps: 0,
      total: 8
    }
  },
  {
    id: '3',
    name: 'Carol Martinez',
    role: 'Sales Manager',
    department: 'Sales',
    startDate: '2024-03-10',
    status: 'completed',
    progress: {
      devices: 3,
      apps: 7,
      total: 10
    }
  }
];

export default function OnboardingList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const filteredEmployees = MOCK_EMPLOYEES.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getStatusBadge = (status: OnboardingEmployee['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Completed
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            In Progress
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Pending
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Employee Onboarding</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage and track employee onboarding processes
              </p>
            </div>
            <button
              onClick={() => navigate('/onboarding/new')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Onboarding
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="p-8 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search by name or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-4">
              <select
                className="block rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <select
                className="block rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value="all">All Departments</option>
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>
          </div>
        </div>

        {/* Employee List */}
        <div className="divide-y divide-gray-200">
          {filteredEmployees.map(employee => (
            <div
              key={employee.id}
              className="p-6 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
              onClick={() => navigate(`/onboarding/${employee.id}`)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{employee.name}</h3>
                      <p className="text-sm text-gray-500">{employee.role}</p>
                    </div>
                    {getStatusBadge(employee.status)}
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      Start Date: {new Date(employee.startDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Package className="w-4 h-4 mr-2" />
                      Devices: {employee.progress.devices} of {employee.progress.total}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <AppWindow className="w-4 h-4 mr-2" />
                      Apps: {employee.progress.apps} of {employee.progress.total}
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block text-indigo-600">
                            Progress
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-indigo-600">
                            {Math.round(((employee.progress.devices + employee.progress.apps) / (employee.progress.total * 2)) * 100)}%
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-indigo-100">
                        <div
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600 transition-all duration-300"
                          style={{ width: `${((employee.progress.devices + employee.progress.apps) / (employee.progress.total * 2)) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}