import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

interface DepartmentPackage {
  id: string;
  department: string;
  name: string;
  description: string;
  totalValue: number;
  monthlyLease: number;
  devices: {
    id: string;
    name: string;
    specs: string;
    image: string;
    price: number;
    leasePrice: number;
  }[];
}

const INITIAL_PACKAGES: DepartmentPackage[] = [
  {
    id: 'eng-pkg',
    department: 'Engineering',
    name: 'Developer Setup',
    description: 'Standard package for software developers',
    totalValue: 3198,
    monthlyLease: 160,
    devices: [
      {
        id: 'mbp-14',
        name: 'MacBook Pro 14"',
        specs: 'M2 Pro, 16GB RAM, 512GB SSD',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000',
        price: 1999,
        leasePrice: 99
      },
      {
        id: 'dell-u2720q',
        name: 'Dell UltraSharp 27"',
        specs: '4K, USB-C, HDR',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=1000',
        price: 699,
        leasePrice: 35
      }
    ]
  },
  {
    id: 'design-pkg',
    department: 'Design',
    name: 'Creative Pro Setup',
    description: 'High-performance setup for designers',
    totalValue: 3998,
    monthlyLease: 200,
    devices: [
      {
        id: 'mbp-16',
        name: 'MacBook Pro 16"',
        specs: 'M2 Max, 32GB RAM, 1TB SSD',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000',
        price: 2499,
        leasePrice: 125
      },
      {
        id: 'studio-display',
        name: 'Studio Display',
        specs: '5K Retina display',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=1000',
        price: 1499,
        leasePrice: 75
      }
    ]
  }
];

export default function HardwareSettings() {
  const [packages, setPackages] = useState<DepartmentPackage[]>(INITIAL_PACKAGES);
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Hardware Management</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage department packages and hardware inventory
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Package
        </button>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {packages.map(pkg => (
          <div
            key={pkg.id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          >
            {/* Package Header */}
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mb-2">
                    {pkg.department}
                  </span>
                  <h3 className="text-lg font-medium text-gray-900">{pkg.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{pkg.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-indigo-600">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Package Value Summary */}
              <div className="mt-4 flex items-center justify-between">
                <div className="space-y-1">
                  <div>
                    <span className="text-sm text-gray-500">Total Value</span>
                    <p className="text-lg font-semibold text-gray-900">
                      ${pkg.totalValue.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Monthly Lease</span>
                    <p className="text-lg font-semibold text-indigo-600">
                      ${pkg.monthlyLease}/mo
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {pkg.devices.length} devices
                </span>
              </div>
            </div>

            {/* Devices List */}
            <div className="border-t border-gray-200">
              {pkg.devices.map(device => (
                <div
                  key={device.id}
                  className="flex items-center p-4 hover:bg-gray-50"
                >
                  <img
                    src={device.image}
                    alt={device.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{device.name}</h4>
                        <p className="text-sm text-gray-500">{device.specs}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          ${device.price}
                        </p>
                        <p className="text-xs text-indigo-600">
                          ${device.leasePrice}/mo
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="p-4 bg-gray-50">
                <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Device to Package
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}