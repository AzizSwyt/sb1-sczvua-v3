import React from 'react';
import { CheckCircle, Clock, CreditCard, Calendar } from 'lucide-react';
import { License } from '../../types';

interface Props {
  licenses: License[];
  onUpdate: (licenses: License[]) => void;
}

export default function LicenseManagement({ licenses = [], onUpdate }: Props) {
  const assignLicense = (licenseId: string) => {
    const updatedLicenses = licenses.map(license =>
      license.id === licenseId
        ? { ...license, status: 'completed' }
        : license
    );
    onUpdate(updatedLicenses);
  };

  const revokeLicense = (licenseId: string) => {
    const updatedLicenses = licenses.map(license =>
      license.id === licenseId
        ? { ...license, status: 'pending' }
        : license
    );
    onUpdate(updatedLicenses);
  };

  if (!licenses || licenses.length === 0) {
    return <p className="text-sm text-gray-500">No licenses available for management.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {licenses.map(license => (
          <div
            key={license.id}
            className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow duration-200"
          >
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {license.name}
                  </h3>
                  <p className="text-sm text-gray-500">{license.provider}</p>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    license.type === 'perpetual'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {license.type === 'perpetual' ? 'Perpetual' : 'Subscription'}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <CreditCard className="w-4 h-4 mr-2" />
                  ${license.cost}
                  {license.period && (
                    <span className="ml-1">/{license.period}</span>
                  )}
                </div>
                {license.period && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    {license.period === 'monthly' ? 'Monthly renewal' : 'Annual renewal'}
                  </div>
                )}
              </div>

              <div className="mt-4">
                {license.status === 'pending' ? (
                  <button
                    onClick={() => assignLicense(license.id)}
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Assign License
                  </button>
                ) : (
                  <button
                    onClick={() => revokeLicense(license.id)}
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Assigned
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
