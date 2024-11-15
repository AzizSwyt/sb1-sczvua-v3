import React, { useState } from 'react';
import { Search, Plus, X } from 'lucide-react';
import { AppLibraryItem, AppSetup } from '../../types';
import { APP_LIBRARY, APP_CATEGORIES } from '../../data/appLibrary';

interface Props {
  onAddApp: (app: AppSetup) => void;
  onClose: () => void;
  existingApps: AppSetup[];
}

export default function AppLibrary({ onAddApp, onClose, existingApps }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredApps = APP_LIBRARY.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
    const notAlreadyAdded = !existingApps.some(existing => existing.id === app.id);
    return matchesSearch && matchesCategory && notAlreadyAdded;
  });

  const handleAddApp = (libraryApp: AppLibraryItem) => {
    const newApp: AppSetup = {
      ...libraryApp,
      status: 'pending',
      steps: libraryApp.defaultSteps.map(step => ({
        ...step,
        status: 'pending'
      }))
    };
    onAddApp(newApp);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">Add Apps</h3>
              <button
                onClick={onClose}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 flex space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Search apps..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="block rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {APP_CATEGORIES.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* App Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredApps.map(app => (
                <div
                  key={app.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={app.icon}
                      alt={app.name}
                      className="w-10 h-10 rounded-lg"
                    />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{app.name}</h4>
                      <p className="text-xs text-gray-500">{app.category}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{app.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {app.defaultSteps.length} setup steps
                    </span>
                    <button
                      onClick={() => handleAddApp(app)}
                      className="inline-flex items-center px-3 py-1 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}