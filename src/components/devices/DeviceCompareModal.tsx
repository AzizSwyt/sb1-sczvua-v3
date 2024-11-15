import React from 'react';
import { X } from 'lucide-react';
import { Device } from '../../types';

interface Props {
  devices: Device[];
  onClose: () => void;
}

export default function DeviceCompareModal({ devices, onClose }: Props) {
  const specs = [
    { label: 'Brand', key: 'brand' },
    { label: 'Type', key: 'type' },
    { label: 'Specifications', key: 'specs' },
    { label: 'Price', key: 'price' },
    { label: 'Monthly Lease', key: 'leasePrice' },
    { label: 'Stock', key: 'stock' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Compare Devices</h3>
              <button
                onClick={onClose}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {/* Headers */}
              <div className="col-span-1" />
              {devices.map(device => (
                <div key={device.id} className="text-center">
                  <img
                    src={device.image}
                    alt={device.name}
                    className="w-32 h-32 mx-auto object-cover rounded-lg"
                  />
                  <h4 className="mt-2 font-medium text-gray-900">{device.name}</h4>
                </div>
              ))}

              {/* Specs Comparison */}
              {specs.map(spec => (
                <React.Fragment key={spec.key}>
                  <div className="font-medium text-gray-500">{spec.label}</div>
                  {devices.map(device => (
                    <div key={device.id} className="text-center">
                      {spec.key === 'price' && '$'}
                      {device[spec.key as keyof Device]}
                      {spec.key === 'leasePrice' && '/mo'}
                      {spec.key === 'stock' && ' units'}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}