import React, { useState } from 'react';
import { Package2, ShoppingCart } from 'lucide-react';
import { Device } from '../types';
import RecommendedPackage from './devices/RecommendedPackage';
import DeviceCatalog from './devices/DeviceCatalog';
import CartSummary from './devices/CartSummary';

interface Props {
  data: Device[];
  updateData: (data: Device[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function DeviceAssignment({ data, updateData, onNext, onBack }: Props) {
  const [view, setView] = useState<'package' | 'catalog'>('package');
  const [cart, setCart] = useState<Device[]>(data);
  const [department, setDepartment] = useState('Engineering'); // This should come from employee info

  const handleAddToCart = (device: Device) => {
    setCart([...cart, device]);
  };

  const handleRemoveFromCart = (deviceId: string) => {
    setCart(cart.filter(d => d.id !== deviceId));
  };

  const handlePackageSelect = (devices: Device[]) => {
    setCart(devices);
  };

  const handleSubmit = (isLeasing: boolean) => {
    updateData(cart.map(device => ({ ...device, isLeasing })));
    onNext();
  };

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setView('package')}
            className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 ${
              view === 'package'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Package2 className="w-5 h-5" />
            <span>Recommended Package</span>
          </button>
          <button
            onClick={() => setView('catalog')}
            className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 ${
              view === 'catalog'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Device Catalog</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {view === 'package' ? (
            <RecommendedPackage
              department={department}
              onSelectPackage={handlePackageSelect}
            />
          ) : (
            <DeviceCatalog
              onAddToCart={handleAddToCart}
              selectedDevices={cart}
            />
          )}
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <CartSummary
            devices={cart}
            onRemoveDevice={handleRemoveFromCart}
            onSubmit={handleSubmit}
            onBack={onBack}
          />
        </div>
      </div>
    </div>
  );
}