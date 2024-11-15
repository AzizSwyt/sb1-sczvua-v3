import React from 'react';
import { Trash2 } from 'lucide-react';
import { Device } from '../../types';

interface Props {
  devices: Device[];
  onRemoveDevice: (deviceId: string) => void;
  onSubmit: (isLeasing: boolean) => void;
  onBack: () => void;
}

export default function CartSummary({ devices, onRemoveDevice, onSubmit, onBack }: Props) {
  const totalPrice = devices.reduce((sum, device) => sum + device.price, 0);
  const monthlyLease = devices.reduce((sum, device) => sum + (device.leasePrice || 0), 0);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6 sticky top-6">
      <h3 className="text-lg font-medium text-gray-900">Selected Devices</h3>

      {devices.length === 0 ? (
        <p className="text-sm text-gray-500">No devices selected</p>
      ) : (
        <>
          <div className="space-y-4">
            {devices.map(device => (
              <div key={device.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={device.image}
                    alt={device.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{device.name}</p>
                    <p className="text-xs text-gray-500">${device.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveDevice(device.id)}
                  className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Total Purchase Price</span>
              <span className="text-sm font-medium text-gray-900">${totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Monthly Lease</span>
              <span className="text-sm font-medium text-indigo-600">${monthlyLease}/mo</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => onSubmit(false)}
              className="w-full py-2 px-4 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Purchase Devices
            </button>
            <button
              onClick={() => onSubmit(true)}
              className="w-full py-2 px-4 rounded-lg text-sm font-medium border border-indigo-600 text-indigo-600 hover:bg-indigo-50"
            >
              Lease Devices
            </button>
          </div>
        </>
      )}

      <button
        onClick={onBack}
        className="w-full py-2 px-4 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50"
      >
        Back
      </button>
    </div>
  );
}