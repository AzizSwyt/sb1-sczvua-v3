import React, { useState } from 'react';
import { Search, Plus, X, Check } from 'lucide-react';
import { License, LicenseLibraryItem } from '../../types';
import { LICENSE_LIBRARY } from '../../data/licenseLibrary';

interface Props {
  onAddLicense: (license: License) => void;
  onClose: () => void;
  existingLicenses: License[];
}

export default function LicenseLibrary({ onAddLicense, onClose, existingLicenses }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const filteredLicenses = LICENSE_LIBRARY.filter(license => {
    const matchesSearch = license.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         license.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || license.type === selectedType;
    const notAlreadyAdded = !existingLicenses.some(existing => existing.id === license.id);
    return matchesSearch && matchesType && notAlreadyAdded;
  });

  const handleAddLicense = (libraryLicense: LicenseLibraryItem) => {
    const newLicense: License = {
      ...libraryLicense,
      status: 'pending'
    };
    onAddLicense(newLicense);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">Add Licenses</h3>
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
                  placeholder="Search licenses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="block rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="perpetual">Perpetual</option>
                <option value="subscription">Subscription</option>
              </select>
            </div>

            {/* License Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredLicenses.map(license => (
                <div
                  key={license.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{license.name}</h4>
                      <p className="text-xs text-gray-500">{license.provider}</p>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        license.type === 'perpetual'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {license.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{license.description}</p>
                  <ul className="text-xs text-gray-500 mb-4 space-y-1">
                    {license.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="w-3 h-3 mr-1 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        ${license.cost}
                        {license.period && <span className="text-xs text-gray-500">/{license.period}</span>}
                      </p>
                    </div>
                    <button
                      onClick={() => handleAddLicense(license)}
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