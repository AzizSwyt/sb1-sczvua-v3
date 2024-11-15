import React, { useState } from 'react';
import { Package, Plus, Edit2, Trash2, Archive, DollarSign } from 'lucide-react';

interface HardwareCategory {
  id: string;
  name: string;
  description: string;
}

const HARDWARE_CATEGORIES: HardwareCategory[] = [
  { id: 'laptops', name: 'Laptops', description: 'Portable computers' },
  { id: 'monitors', name: 'Monitors', description: 'Display screens' },
  { id: 'accessories', name: 'Accessories', description: 'Keyboards, mice, etc.' },
  { id: 'mobile', name: 'Mobile Devices', description: 'Phones and tablets' }
];

interface Device {
  id: string;
  name: string;
  specs: string;
  image: string;
  price: number;
  leasePrice: number;
}

interface DepartmentPackage {
  id: string;
  department: string;
  name: string;
  description: string;
  totalValue: number;
  monthlyLease: number;
  devices: Device[];
}

export default function HardwareSettings() {
  const [activeTab, setActiveTab] = useState<'catalog' | 'stock' | 'packages'>('packages');
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const departmentPackages: DepartmentPackage[] = [
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
          id: 'pro-display',
          name: 'Studio Display',
          specs: '5K Retina display',
          image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=1000',
          price: 1499,
          leasePrice: 75
        }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Hardware Management</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage department packages and hardware inventory
              </p>
            </div>
            <button
              onClick={() => setShowAddDevice(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Package
            </button>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {departmentPackages.map(pkg => (
              <div
                key={pkg.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                {/* Package Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mb-2">
                        {pkg.department}
                      </span>
                      <h3 className="text-lg font-medium text-gray-900">{pkg.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{pkg.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-gray-50">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-50">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Package Value Summary */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex space-x-6">
                      <div>
                        <p className="text-sm text-gray-500">Total Value</p>
                        <p className="text-lg font-semibold text-gray-900">
                          ${pkg.totalValue.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Monthly Lease</p>
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
                <div className="divide-y divide-gray-200">
                  {pkg.devices.map(device => (
                    <div key={device.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            src={device.image}
                            alt={device.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {device.name}
                            </p>
                            <div className="flex items-center space-x-4">
                              <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">
                                  ${device.price}
                                </p>
                                <p className="text-xs text-indigo-600">
                                  ${device.leasePrice}/mo
                                </p>
                              </div>
                              <button className="p-1 text-gray-400 hover:text-red-600">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{device.specs}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Device Button */}
                <div className="p-4 bg-gray-50">
                  <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Device to Package
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}