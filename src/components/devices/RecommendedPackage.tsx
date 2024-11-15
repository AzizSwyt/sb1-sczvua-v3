import React, { useState } from 'react';
import { Package, Check, Info, ArrowRight } from 'lucide-react';
import { Device } from '../../types';

interface PackageDevice extends Device {
  leasePrice?: number;
}

interface DepartmentPackage {
  id: string;
  name: string;
  description: string;
  devices: PackageDevice[];
  totalPrice: number;
  monthlyLease: number;
}

const DEPARTMENT_PACKAGES: Record<string, DepartmentPackage> = {
  Engineering: {
    id: 'engineering-pkg',
    name: 'Developer Powerhouse',
    description: 'High-performance setup for coding and development',
    devices: [
      {
        id: 'macbook-16',
        name: 'MacBook Pro 16"',
        type: 'Laptops',
        brand: 'Apple',
        specs: 'M2 Max, 32GB RAM, 1TB SSD',
        price: 2499,
        leasePrice: 125,
        stock: 3,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000',
      },
      {
        id: 'dell-32-4k',
        name: 'Dell UltraSharp 32" 4K',
        type: 'Monitors',
        brand: 'Dell',
        specs: '4K, USB-C, HDR',
        price: 699,
        leasePrice: 35,
        stock: 5,
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=1000',
      }
    ],
    totalPrice: 3198,
    monthlyLease: 160
  },
  Design: {
    id: 'design-pkg',
    name: 'Creative Pro Suite',
    description: 'Perfect for designers and creative professionals',
    devices: [
      {
        id: 'macbook-14',
        name: 'MacBook Pro 14"',
        type: 'Laptops',
        brand: 'Apple',
        specs: 'M2 Pro, 32GB RAM, 1TB SSD',
        price: 1999,
        leasePrice: 99,
        stock: 4,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000',
      },
      {
        id: 'pro-display',
        name: 'Apple Pro Display XDR',
        type: 'Monitors',
        brand: 'Apple',
        specs: '6K, Reference Mode, XDR',
        price: 4999,
        leasePrice: 250,
        stock: 2,
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=1000',
      }
    ],
    totalPrice: 6998,
    monthlyLease: 349
  },
  Marketing: {
    id: 'marketing-pkg',
    name: 'Marketing Pro Package',
    description: 'Perfect for content creation and digital marketing',
    devices: [
      {
        id: 'macbook-13',
        name: 'MacBook Pro 13"',
        type: 'Laptops',
        brand: 'Apple',
        specs: 'M2, 16GB RAM, 512GB SSD',
        price: 1499,
        leasePrice: 75,
        stock: 6,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000',
      },
      {
        id: 'dell-27',
        name: 'Dell UltraSharp 27"',
        type: 'Monitors',
        brand: 'Dell',
        specs: '4K, USB-C, HDR',
        price: 499,
        leasePrice: 25,
        stock: 8,
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=1000',
      }
    ],
    totalPrice: 1998,
    monthlyLease: 100
  },
  Sales: {
    id: 'sales-pkg',
    name: 'Sales Mobility Package',
    description: 'Lightweight and portable setup for sales professionals',
    devices: [
      {
        id: 'macbook-air',
        name: 'MacBook Air',
        type: 'Laptops',
        brand: 'Apple',
        specs: 'M2, 8GB RAM, 256GB SSD',
        price: 999,
        leasePrice: 50,
        stock: 10,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000',
      },
      {
        id: 'ipad-pro',
        name: 'iPad Pro 12.9"',
        type: 'Tablets',
        brand: 'Apple',
        specs: 'M2, 256GB, Wi-Fi + 5G',
        price: 1099,
        leasePrice: 55,
        stock: 7,
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=1000',
      }
    ],
    totalPrice: 2098,
    monthlyLease: 105
  }
};

interface Props {
  department: string;
  onSelectPackage: (devices: Device[]) => void;
}

export default function RecommendedPackage({ department, onSelectPackage }: Props) {
  const [showStockItems, setShowStockItems] = useState(false);
  const pkg = DEPARTMENT_PACKAGES[department];
  
  if (!pkg) return null;

  const stockDevices = [
    {
      id: 'stock-macbook-pro-2022',
      name: 'MacBook Pro 14" (2022)',
      type: 'Laptops',
      brand: 'Apple',
      specs: 'M1 Pro, 16GB RAM, 512GB SSD',
      price: 1599,
      leasePrice: 80,
      stock: 2,
      condition: 'Excellent',
      previousUser: 'Sales Team',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000',
    },
    {
      id: 'stock-dell-xps',
      name: 'Dell XPS 15',
      type: 'Laptops',
      brand: 'Dell',
      specs: 'i9, 32GB RAM, 1TB SSD',
      price: 1299,
      leasePrice: 65,
      stock: 1,
      condition: 'Very Good',
      previousUser: 'Engineering',
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=1000',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Recommended Package */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Package className="w-6 h-6 text-indigo-600" />
            <div>
              <h3 className="text-lg font-medium text-gray-900">{pkg.name}</h3>
              <p className="text-sm text-gray-500">{pkg.description}</p>
            </div>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
            Recommended
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pkg.devices.map(device => (
            <div key={device.id} className="flex space-x-4 p-4 bg-gray-50 rounded-lg">
              <img
                src={device.image}
                alt={device.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900">{device.name}</h4>
                <p className="text-sm text-gray-500">{device.specs}</p>
                <div className="mt-2 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">${device.price}</p>
                    <p className="text-xs text-gray-500">${device.leasePrice}/mo lease</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    device.stock > 3
                      ? 'bg-green-100 text-green-800'
                      : device.stock > 0
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {device.stock} in stock
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-900">Package Total: ${pkg.totalPrice}</p>
              <p className="text-sm text-gray-500">Monthly Lease: ${pkg.monthlyLease}/mo</p>
            </div>
            <button
              onClick={() => onSelectPackage(pkg.devices)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Select Package
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Stock Items */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Available Stock Items</h3>
            <p className="text-sm text-gray-500">Pre-owned devices in excellent condition</p>
          </div>
          <button
            onClick={() => setShowStockItems(!showStockItems)}
            className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {showStockItems ? 'Hide' : 'Show'} Items
          </button>
        </div>

        {showStockItems && (
          <div className="space-y-4">
            {stockDevices.map(device => (
              <div key={device.id} className="flex space-x-4 p-4 bg-gray-50 rounded-lg">
                <img
                  src={device.image}
                  alt={device.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900">{device.name}</h4>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                      {device.condition}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{device.specs}</p>
                  <p className="text-xs text-gray-500 mt-1">Previously used by: {device.previousUser}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">${device.price}</p>
                      <p className="text-xs text-gray-500">${device.leasePrice}/mo lease</p>
                    </div>
                    <button
                      onClick={() => onSelectPackage([device])}
                      className="inline-flex items-center px-3 py-1 border border-indigo-600 rounded-lg text-sm font-medium text-indigo-600 hover:bg-indigo-50"
                    >
                      Select Device
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}