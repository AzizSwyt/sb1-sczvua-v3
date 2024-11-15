import React from 'react';
import { User, Mail, Building2, Briefcase, Calendar, Phone } from 'lucide-react';
import { Employee } from '../types';

interface Props {
  data: Partial<Employee>; // Making all fields optional
  updateData: (data: Partial<Employee>) => void;
  onNext: () => void;
}

const DEPARTMENTS = [
  'Engineering',
  'Product',
  'Design',
  'Marketing',
  'Sales',
  'Customer Success',
  'HR',
  'Finance',
  'Legal',
];

export default function EmployeeInfo({ data, updateData, onNext }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const InputField = ({ 
    icon: Icon, 
    label, 
    type, 
    value, 
    onChange, 
    options = null 
  }: any) => (
    <div className="relative overflow-hidden">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        {options ? (
          <select
            className="block w-full pl-10 pr-4 py-2.5 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition duration-150 ease-in-out"
            value={value || ''}
            onChange={onChange}
          >
            <option value="">Select {label}</option>
            {options.map((opt: string) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            className="block w-full pl-10 pr-4 py-2.5 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition duration-150 ease-in-out"
            value={value || ''}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm text-gray-500">
            Please provide the employee's basic information.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            icon={User}
            label="First Name"
            type="text"
            value={data.firstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateData({ ...data, firstName: e.target.value })
            }
          />
          <InputField
            icon={User}
            label="Last Name"
            type="text"
            value={data.lastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateData({ ...data, lastName: e.target.value })
            }
          />
        </div>

        <InputField
          icon={Mail}
          label="Email Address"
          type="email"
          value={data.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateData({ ...data, email: e.target.value })
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            icon={Building2}
            label="Department"
            options={DEPARTMENTS}
            value={data.department}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              updateData({ ...data, department: e.target.value })
            }
          />
          <InputField
            icon={Briefcase}
            label="Role"
            type="text"
            value={data.role}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateData({ ...data, role: e.target.value })
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            icon={Calendar}
            label="Start Date"
            type="date"
            value={data.startDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateData({ ...data, startDate: e.target.value })
            }
          />
          <InputField
            icon={Phone}
            label="Phone Number"
            type="tel"
            value={data.phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateData({ ...data, phone: e.target.value })
            }
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
        >
          Continue to Device Selection
        </button>
      </div>
    </form>
  );
}
