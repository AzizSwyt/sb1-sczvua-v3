import React from 'react';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { AppSetup, License } from '../../types';

interface Props {
  apps: AppSetup[];
  licenses: License[];
}

export default function SetupProgress({ apps = [], licenses = [] }: Props) {
  const totalItems = apps.length + licenses.length;
  const completedItems = 
    apps.filter(app => app.status === 'completed').length +
    licenses.filter(license => license.status === 'completed').length;
  
  const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  const inProgressApps = apps.filter(app => app.steps.some(step => step.status === 'in_progress')).length;
  const failedApps = apps.filter(app => app.steps.some(step => step.status === 'failed')).length;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Setup Progress</h3>
          <p className="text-sm text-gray-500">Track app setup and license assignments</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold text-indigo-600">{progress}%</p>
          <p className="text-sm text-gray-500">
            {completedItems} of {totalItems} completed
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            <span className="text-sm font-medium text-green-900">Completed</span>
          </div>
          <p className="mt-1 text-2xl font-semibold text-green-900">{completedItems}</p>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-yellow-500 mr-2" />
            <span className="text-sm font-medium text-yellow-900">In Progress</span>
          </div>
          <p className="mt-1 text-2xl font-semibold text-yellow-900">{inProgressApps}</p>
        </div>

        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-sm font-medium text-red-900">Failed</span>
          </div>
          <p className="mt-1 text-2xl font-semibold text-red-900">{failedApps}</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}