import React from 'react';
import { Check, AlertCircle, Package, MapPin, Calendar, Workflow, AppWindow, CreditCard, ArrowRight, Download } from 'lucide-react';
import { OnboardingData } from '../types';

interface Props {
  data: OnboardingData;
  onBack: () => void;
}

export default function Summary({ data, onBack }: Props) {
  const totalDeviceCost = data.devices.reduce((sum, device) => sum + device.price, 0);
  const monthlyLeaseCost = data.devices.reduce((sum, device) => sum + (device.leasePrice || 0), 0);
  const completedTasks = data.tasks.filter(task => task.status === 'completed').length;
  const completedApps = data.apps.filter(app => app.status === 'completed').length;

  const StatusBadge = ({ status }: { status: string }) => (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
      status === 'completed'
        ? 'bg-green-100 text-green-800'
        : status === 'in_progress'
        ? 'bg-yellow-100 text-yellow-800'
        : 'bg-gray-100 text-gray-800'
    }`}>
      {status === 'completed' ? (
        <Check className="w-3 h-3 mr-1" />
      ) : (
        <AlertCircle className="w-3 h-3 mr-1" />
      )}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Onboarding Summary</h2>
            <p className="mt-1 text-sm text-gray-500">Review and confirm the onboarding details</p>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-indigo-50 rounded-lg p-4">
            <div className="flex items-center text-indigo-600 mb-2">
              <Package className="w-5 h-5 mr-2" />
              <span className="font-medium">Equipment</span>
            </div>
            <p className="text-2xl font-semibold text-indigo-900">${totalDeviceCost}</p>
            <p className="text-sm text-indigo-600">${monthlyLeaseCost}/mo lease</p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center text-green-600 mb-2">
              <Workflow className="w-5 h-5 mr-2" />
              <span className="font-medium">Tasks</span>
            </div>
            <p className="text-2xl font-semibold text-green-900">{completedTasks}/{data.tasks.length}</p>
            <p className="text-sm text-green-600">Tasks completed</p>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center text-purple-600 mb-2">
              <AppWindow className="w-5 h-5 mr-2" />
              <span className="font-medium">Apps</span>
            </div>
            <p className="text-2xl font-semibold text-purple-900">{completedApps}/{data.apps.length}</p>
            <p className="text-sm text-purple-600">Apps configured</p>
          </div>
        </div>
      </div>

      {/* Employee Information */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Employee Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium text-gray-500">Name</p>
            <p className="mt-1 text-sm text-gray-900">{data.employee.firstName} {data.employee.lastName}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="mt-1 text-sm text-gray-900">{data.employee.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Department</p>
            <p className="mt-1 text-sm text-gray-900">{data.employee.department}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Role</p>
            <p className="mt-1 text-sm text-gray-900">{data.employee.role}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Start Date</p>
            <p className="mt-1 text-sm text-gray-900">{data.employee.startDate}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Phone</p>
            <p className="mt-1 text-sm text-gray-900">{data.employee.phone}</p>
          </div>
        </div>
      </div>

      {/* Equipment */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Equipment</h3>
        <div className="space-y-4">
          {data.devices.map(device => (
            <div key={device.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <img
                  src={device.image}
                  alt={device.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">{device.name}</p>
                  <p className="text-xs text-gray-500">{device.specs}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">${device.price}</p>
                {device.isLeasing && (
                  <p className="text-xs text-indigo-600">${device.leasePrice}/mo</p>
                )}
              </div>
            </div>
          ))}
          <div className="flex justify-between pt-4 border-t border-gray-200">
            <span className="text-sm font-medium text-gray-500">Total Cost</span>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">${totalDeviceCost}</p>
              {monthlyLeaseCost > 0 && (
                <p className="text-xs text-indigo-600">${monthlyLeaseCost}/mo lease</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Details */}
      {data.delivery && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="w-5 h-5 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900">Delivery Details</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Delivery Address</p>
              <p className="mt-1 text-sm text-gray-900">
                {data.delivery.address}<br />
                {data.delivery.city}, {data.delivery.state} {data.delivery.zipCode}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Delivery Date</p>
              <div className="flex items-center mt-1">
                <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                <p className="text-sm text-gray-900">{data.delivery.deliveryDate}</p>
              </div>
            </div>
            {data.delivery.instructions && (
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-500">Special Instructions</p>
                <p className="mt-1 text-sm text-gray-900">{data.delivery.instructions}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tasks */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Onboarding Tasks</h3>
        <div className="space-y-4">
          {data.tasks.map(task => (
            <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <StatusBadge status={task.status} />
                <span className="text-sm text-gray-900">{task.title}</span>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                task.priority === 'high'
                  ? 'bg-red-100 text-red-800'
                  : task.priority === 'medium'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {task.priority}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Apps and Licenses */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Software & Licenses</h3>
        <div className="space-y-6">
          {/* Apps */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Applications</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.apps.map(app => (
                <div key={app.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <img src={app.icon} alt={app.name} className="w-8 h-8 rounded mr-3" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{app.name}</p>
                    <div className="flex items-center mt-1">
                      <StatusBadge status={app.status} />
                      <span className="ml-2 text-xs text-gray-500">
                        {app.steps.filter(s => s.status === 'completed').length} of {app.steps.length} steps completed
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Licenses */}
          {data.licenses && data.licenses.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Software Licenses</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.licenses.map(license => (
                  <div key={license.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{license.name}</p>
                      <p className="text-xs text-gray-500">{license.provider}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">${license.cost}</p>
                      {license.period && (
                        <p className="text-xs text-gray-500">per {license.period}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        <button
          className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Complete Onboarding
          <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
}