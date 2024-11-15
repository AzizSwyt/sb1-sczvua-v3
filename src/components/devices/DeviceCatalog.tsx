import React, { useState } from 'react';
import { Search, SlidersHorizontal, Plus, ArrowUpDown } from 'lucide-react';
import { Device } from '../../types';
import DeviceCompareModal from './DeviceCompareModal';

const CATALOG_DEVICES: Device[] = [
  {
    id: 'macbook-pro-14',
    name: 'MacBook Pro 14"',
    type: 'Laptops',
    brand: 'Apple',
    specs: 'M2 Pro, 16GB RAM, 512GB SSD',
    price: 1999,
    leasePrice: 99,
    stock: 5,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 'dell-xps-13',
    name: 'Dell XPS 13',
    type: 'Laptops',
    brand: 'Dell',
    specs: 'Intel i7, 16GB RAM, 512GB SSD',
    price: 1299,
    leasePrice: 65,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=1000',
  },
  // ... Add more devices as needed
];

interface Props {
  onAddToCart: (device: Device) => void;
  selectedDevices: Device[];
}

const DEVICE_TYPES = ['All', 'Laptops', 'Monitors', 'Accessories'];
const BRANDS = ['All', 'Apple', 'Dell', 'Microsoft', 'LG', 'Logitech'];

export default function DeviceCatalog({ onAddToCart, selectedDevices }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [compareDevices, setCompareDevices] = useState<Device[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filteredDevices = CATALOG_DEVICES.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || device.type === selectedType;
    const matchesBrand = selectedBrand === 'All' || device.brand === selectedBrand;
    return matchesSearch && matchesType && matchesBrand;
  });

  const toggleCompareDevice = (device: Device) => {
    if (compareDevices.find(d => d.id === device.id)) {
      setCompareDevices(compareDevices.filter(d => d.id !== device.id));
    } else if (compareDevices.length < 3) {
      setCompareDevices([...compareDevices, device]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="Search devices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </button>
            {compareDevices.length > 0 && (
              <button
                onClick={() => setShowCompareModal(true)}
                className="inline-flex items-center px-4 py-2 border border-indigo-600 rounded-lg text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50"
              >
                <ArrowUpDown className="w-4 h-4 mr-2" />
                Compare ({compareDevices.length})
              </button>
            )}
          </div>

          {showFilters && (
            <div className="flex space-x-4 pt-4 border-t">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="block w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {DEVICE_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="block w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {BRANDS.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Device Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDevices.map(device => (
          <div key={device.id} className="bg-white rounded-lg shadow-sm overflow-hidden flex">
            <div className="w-1/3">
              <img
                src={device.image}
                alt={device.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-2/3 p-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{device.name}</h3>
                  <p className="mt-1 text-xs text-gray-500">{device.specs}</p>
                </div>
                <button
                  onClick={() => toggleCompareDevice(device)}
                  className={`p-1 rounded-full hover:bg-gray-100 ${
                    compareDevices.find(d => d.id === device.id)
                      ? 'text-indigo-600'
                      : 'text-gray-400'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Price</span>
                  <span className="text-sm font-medium text-gray-900">${device.price}</span>
                </div>
                <div className="mt-1 flex justify-between items-center">
                  <span className="text-xs text-gray-500">Monthly Lease</span>
                  <span className="text-xs font-medium text-indigo-600">
                    ${device.leasePrice}/mo
                  </span>
                </div>
                <div className="mt-1 flex justify-between items-center">
                  <span className="text-xs text-gray-500">Stock</span>
                  <span className={`text-xs font-medium ${
                    device.stock > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {device.stock > 0 ? `${device.stock} available` : 'Out of stock'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onAddToCart(device)}
                disabled={device.stock === 0 || selectedDevices.some(d => d.id === device.id)}
                className={`mt-4 w-full py-2 px-4 rounded-lg text-sm font-medium ${
                  device.stock === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : selectedDevices.some(d => d.id === device.id)
                    ? 'bg-green-50 text-green-600 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {selectedDevices.some(d => d.id === device.id)
                  ? 'Added to Cart'
                  : device.stock === 0
                  ? 'Out of Stock'
                  : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {showCompareModal && (
        <DeviceCompareModal
          devices={compareDevices}
          onClose={() => setShowCompareModal(false)}
        />
      )}
    </div>
  );
}