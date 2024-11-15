import React, { useState } from 'react';
import { Plus, Trash2, CreditCard, Calendar, Check, X } from 'lucide-react';
import { LICENSE_LIBRARY } from '../../../data/licenseLibrary';
import { LicenseLibraryItem } from '../../../types';

interface DefaultLicense extends LicenseLibraryItem {
  isDefault: boolean;
  departments: string[];
  roles: string[];
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

const ROLES = [
  'Developer',
  'Designer',
  'Manager',
  'Director',
  'VP',
  'C-Level',
  'Sales Representative',
  'Account Manager',
  'Support Engineer',
];

export default function DefaultLicensesSettings() {
  const [licenses, setLicenses] = useState<DefaultLicense[]>(
    LICENSE_LIBRARY.map(license => ({
      ...license,
      isDefault: false,
      departments: [],
      roles: []
    }))
  );
  const [showAddLicense, setShowAddLicense] = useState(false);
  const [selectedType, setSelectedType] = useState('all');

  const filteredLicenses = selectedType === 'all'
    ? licenses
    : licenses.filter(license => license.type === selectedType);

  const toggleDefault = (licenseId: string) => {
    setLicenses(licenses.map(license =>
      license.id === licenseId ? { ...license, isDefault: !license.isDefault } : license
    ));
  };

  const updateDepartments = (licenseId: string, departments: string[]) => {
    setLicenses(licenses.map(license =>
      license.id === licenseId ? { ...license, departments } : license
    ));
  };

  const updateRoles = (licenseId: string, roles: string[]) => {
    setLicenses(licenses.map(license =>
      license.id === licenseId ? { ...license, roles } : license
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Default Licenses</h3>
          <p className="mt-1 text-sm text-gray-500">
            Configure default software licenses for new employees
          </p>
        </div>
        <button
          onClick={() => setShowAddLicense(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add License
        </button>
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
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

      {/* Licenses List */}
      <div className="space-y-4">
        {filteredLicenses.map(license => (
          <div
            key={license.id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{license.name}</h4>
                    <p className="text-sm text-gray-500">{license.provider}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    license.type === 'perpetual'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {license.type}
                  </span>
                  <button
                    onClick={() => toggleDefault(license.id)}
                    className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium ${
                      license.isDefault
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {license.isDefault ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Default
                      </>
                    ) : (
                      'Make Default'
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-6 space-y-6">
                {/* Cost Information */}
                <div className="flex items-center space-x-6">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Cost</p>
                    <p className="mt-1 text-sm text-gray-500">
                      ${license.cost}
                      {license.period && <span>/{license.period}</span>}
                    </p>
                  </div>
                  {license.period && (
                    <div>
                      <p className="text-sm font-medium text-gray-900">Billing Cycle</p>
                      <p className="mt-1 text-sm text-gray-500">
                        {license.period === 'monthly' ? 'Monthly' : 'Annual'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Features</p>
                  <div className="grid grid-cols-2 gap-2">
                    {license.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-500">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Department Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assign to Departments
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {DEPARTMENTS.map(dept => (
                      <label
                        key={dept}
                        className="flex items-center space-x-2 text-sm"
                      >
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          checked={license.departments.includes(dept)}
                          onChange={(e) => {
                            const newDepts = e.target.checked
                              ? [...license.departments, dept]
                              : license.departments.filter(d => d !== dept);
                            updateDepartments(license.id, newDepts);
                          }}
                        />
                        <span>{dept}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Role Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assign to Roles
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {ROLES.map(role => (
                      <label
                        key={role}
                        className="flex items-center space-x-2 text-sm"
                      >
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          checked={license.roles.includes(role)}
                          onChange={(e) => {
                            const newRoles = e.target.checked
                              ? [...license.roles, role]
                              : license.roles.filter(r => r !== role);
                            updateRoles(license.id, newRoles);
                          }}
                        />
                        <span>{role}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add License Modal */}
      {showAddLicense && (
        <AddLicenseModal
          existingLicenses={licenses}
          onAdd={(license) => {
            setLicenses([...licenses, {
              ...license,
              isDefault: false,
              departments: [],
              roles: []
            }]);
            setShowAddLicense(false);
          }}
          onClose={() => setShowAddLicense(false)}
        />
      )}
    </div>
  );
}

interface AddLicenseModalProps {
  existingLicenses: DefaultLicense[];
  onAdd: (license: LicenseLibraryItem) => void;
  onClose: () => void;
}

function AddLicenseModal({ existingLicenses, onAdd, onClose }: AddLicenseModalProps) {
  const availableLicenses = LICENSE_LIBRARY.filter(
    license => !existingLicenses.some(existing => existing.id === license.id)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Add License
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableLicenses.map(license => (
                <div
                  key={license.id}
                  className="border rounded-lg p-4 hover:border-indigo-500 cursor-pointer"
                  onClick={() => onAdd(license)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900">{license.name}</h4>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      license.type === 'perpetual'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {license.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{license.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{license.provider}</span>
                    <span className="font-medium">
                      ${license.cost}
                      {license.period && <span>/{license.period}</span>}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}