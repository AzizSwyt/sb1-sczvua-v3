import React, { useState } from 'react';
import { Plus, Trash2, Settings, Check, X, ChevronDown, ChevronUp, AppWindow } from 'lucide-react';
import { APP_LIBRARY, APP_CATEGORIES } from '../../../data/appLibrary';
import { AppLibraryItem } from '../../../types';
import AppLibrary from '../../apps/AppLibrary';

interface DefaultAppSetup extends AppLibraryItem {
  isDefault: boolean;
  departmentSetups: {
    department: string;
    steps: {
      id: string;
      title: string;
      description: string;
      automated: boolean;
    }[];
  }[];
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

export default function DefaultAppsSettings() {
  const [apps, setApps] = useState<DefaultAppSetup[]>(
    APP_LIBRARY.map(app => ({
      ...app,
      isDefault: false,
      departmentSetups: []
    }))
  );
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddSteps, setShowAddSteps] = useState<{appId: string, department: string} | null>(null);
  const [expandedApp, setExpandedApp] = useState<string | null>(null);
  const [showAppLibrary, setShowAppLibrary] = useState(false);

  const filteredApps = selectedCategory === 'all'
    ? apps
    : apps.filter(app => app.category === selectedCategory);

  const toggleDefault = (appId: string) => {
    setApps(apps.map(app =>
      app.id === appId ? { ...app, isDefault: !app.isDefault } : app
    ));
  };

  const toggleDepartment = (appId: string, department: string) => {
    setApps(apps.map(app => {
      if (app.id !== appId) return app;

      const hasDepartment = app.departmentSetups.some(setup => setup.department === department);
      
      if (hasDepartment) {
        return {
          ...app,
          departmentSetups: app.departmentSetups.filter(setup => setup.department !== department)
        };
      } else {
        return {
          ...app,
          departmentSetups: [
            ...app.departmentSetups,
            {
              department,
              steps: app.defaultSteps.map(step => ({
                ...step,
                id: Date.now().toString() + Math.random()
              }))
            }
          ]
        };
      }
    }));
  };

  const addCustomStep = (
    appId: string,
    department: string,
    step: { title: string; description: string; automated: boolean }
  ) => {
    setApps(apps.map(app =>
      app.id === appId
        ? {
            ...app,
            departmentSetups: app.departmentSetups.map(setup =>
              setup.department === department
                ? {
                    ...setup,
                    steps: [
                      ...setup.steps,
                      { ...step, id: Date.now().toString() }
                    ]
                  }
                : setup
            )
          }
        : app
    ));
  };

  const removeStep = (appId: string, department: string, stepId: string) => {
    setApps(apps.map(app =>
      app.id === appId
        ? {
            ...app,
            departmentSetups: app.departmentSetups.map(setup =>
              setup.department === department
                ? {
                    ...setup,
                    steps: setup.steps.filter(step => step.id !== stepId)
                  }
                : setup
            )
          }
        : app
    ));
  };

  const handleAddApp = (newApp: AppLibraryItem) => {
    const appSetup: DefaultAppSetup = {
      ...newApp,
      isDefault: false,
      departmentSetups: []
    };
    setApps([...apps, appSetup]);
    setShowAppLibrary(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Default Applications</h3>
          <p className="mt-1 text-sm text-gray-500">
            Configure department-specific app setups and workflows
          </p>
        </div>
        <button
          onClick={() => setShowAppLibrary(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add App
        </button>
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        <select
          className="block rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {APP_CATEGORIES.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>

      {/* Apps List */}
      <div className="space-y-4">
        {filteredApps.map(app => (
          <div
            key={app.id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={app.icon}
                    alt={app.name}
                    className="w-12 h-12 rounded-lg"
                  />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{app.name}</h4>
                    <p className="text-sm text-gray-500">{app.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => toggleDefault(app.id)}
                    className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium ${
                      app.isDefault
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {app.isDefault ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Default
                      </>
                    ) : (
                      'Make Default'
                    )}
                  </button>
                  <button
                    onClick={() => setExpandedApp(expandedApp === app.id ? null : app.id)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    {expandedApp === app.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              {expandedApp === app.id && (
                <div className="mt-6 space-y-6">
                  {/* Department Selection */}
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 mb-4">Departments</h5>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {DEPARTMENTS.map(dept => {
                        const isSelected = app.departmentSetups.some(
                          setup => setup.department === dept
                        );
                        return (
                          <button
                            key={dept}
                            onClick={() => toggleDepartment(app.id, dept)}
                            className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm ${
                              isSelected
                                ? 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            <span>{dept}</span>
                            {isSelected && <Check className="w-4 h-4 ml-2" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Department Setups */}
                  {app.departmentSetups.length > 0 && (
                    <div className="space-y-4">
                      {app.departmentSetups.map(setup => (
                        <div
                          key={setup.department}
                          className="border rounded-lg p-4 bg-gray-50"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h6 className="text-sm font-medium text-gray-900">
                              {setup.department} Setup Steps
                            </h6>
                            <button
                              onClick={() => setShowAddSteps({ appId: app.id, department: setup.department })}
                              className="inline-flex items-center px-2 py-1 text-sm text-indigo-600 hover:bg-indigo-50 rounded"
                            >
                              <Plus className="w-4 h-4 mr-1" />
                              Add Step
                            </button>
                          </div>

                          <div className="space-y-2">
                            {setup.steps.map(step => (
                              <div
                                key={step.id}
                                className="flex items-start justify-between p-3 bg-white rounded-lg"
                              >
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    {step.title}
                                  </p>
                                  <p className="text-sm text-gray-500">{step.description}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {step.automated && (
                                    <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                      Automated
                                    </span>
                                  )}
                                  <button
                                    onClick={() => removeStep(app.id, setup.department, step.id)}
                                    className="text-gray-400 hover:text-red-600"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Step Modal */}
      {showAddSteps && (
        <AddStepModal
          onAdd={(step) => {
            addCustomStep(showAddSteps.appId, showAddSteps.department, step);
            setShowAddSteps(null);
          }}
          onClose={() => setShowAddSteps(null)}
          department={showAddSteps.department}
        />
      )}

      {/* App Library Modal */}
      {showAppLibrary && (
        <AppLibrary
          onAddApp={handleAddApp}
          onClose={() => setShowAppLibrary(false)}
          existingApps={apps}
        />
      )}
    </div>
  );
}

interface AddStepModalProps {
  onAdd: (step: { title: string; description: string; automated: boolean }) => void;
  onClose: () => void;
  department: string;
}

function AddStepModal({ onAdd, onClose, department }: AddStepModalProps) {
  const [step, setStep] = useState({
    title: '',
    description: '',
    automated: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(step);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Add Setup Step
                </h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  {department}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Step Title
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={step.title}
                    onChange={(e) => setStep({ ...step, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    required
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={step.description}
                    onChange={(e) => setStep({ ...step, description: e.target.value })}
                  />
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      checked={step.automated}
                      onChange={(e) => setStep({ ...step, automated: e.target.checked })}
                    />
                    <span className="ml-2 text-sm text-gray-700">Automated Step</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Add Step
              </button>
              <button
                type="button"
                onClick={onClose}
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