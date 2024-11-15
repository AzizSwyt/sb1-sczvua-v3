import React, { useState, useEffect } from 'react';
import { Package, Archive, DollarSign, AlertCircle, CheckCircle, Truck, ArrowRight } from 'lucide-react';

interface Props {
  data: any[];
  updateData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

interface DeviceAction {
  deviceId: string;
  action: 'stock' | 'sell' | 'nothing';
  condition?: string;
  notes?: string;
  estimatedValue?: number;
}

export default function DeviceDeprovisioning({ data, updateData, onNext, onBack }: Props) {
  const [deviceActions, setDeviceActions] = useState<DeviceAction[]>(data || []);
  const [showActionModal, setShowActionModal] = useState<string | null>(null);

  // Mock data for assigned devices
  const assignedDevices = [
    {
      id: '1',
      name: 'MacBook Pro 16"',
      type: 'Laptop',
      specs: 'M1 Pro, 16GB RAM, 512GB SSD',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000',
      price: 2499,
      purchaseDate: '2022-01-15'
    },
    {
      id: '2',
      name: 'Dell UltraSharp 27" Monitor',
      type: 'Monitor',
      specs: '4K, USB-C, HDR',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=1000',
      price: 699,
      purchaseDate: '2022-01-15'
    }
  ];

  const handleActionSelect = (deviceId: string, action: DeviceAction) => {
    const updatedActions = deviceActions.filter(a => a.deviceId !== deviceId);
    updatedActions.push(action);
    setDeviceActions(updatedActions);
    updateData(updatedActions);
    setShowActionModal(null);
  };

  const getDeviceAction = (deviceId: string) => {
    return deviceActions.find(a => a.deviceId === deviceId);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Content */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900">Device Deprovisioning</h2>
        <p className="mt-1 text-sm text-gray-500">
          Select what to do with each assigned device
        </p>

        <div className="mt-6 space-y-6">
          {assignedDevices.map(device => {
            const action = getDeviceAction(device.id);
            
            return (
              <div key={device.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={device.image}
                    alt={device.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{device.name}</h3>
                        <p className="text-sm text-gray-500">{device.specs}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Purchased: {new Date(device.purchaseDate).toLocaleDateString()}
                        </p>
                      </div>
                      {action && (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          action.action === 'stock'
                            ? 'bg-green-100 text-green-800'
                            : action.action === 'sell'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {action.action === 'stock' ? 'Moving to Stock' :
                           action.action === 'sell' ? 'Selling' : 'No Action'}
                        </span>
                      )}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-4">
                      <button
                        onClick={() => setShowActionModal(device.id)}
                        className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium ${
                          action
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                      >
                        {action ? 'Change Action' : 'Select Action'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    </div>

                    {action && action.notes && (
                      <div className="mt-3 text-sm text-gray-500">
                        <p className="font-medium">Notes:</p>
                        <p>{action.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
        >
          Continue
        </button>
      </div>

      {/* Action Modal */}
      {showActionModal && (
        <DeviceActionModal
          device={assignedDevices.find(d => d.id === showActionModal)!}
          currentAction={getDeviceAction(showActionModal)}
          onSave={(action) => handleActionSelect(showActionModal, action)}
          onClose={() => setShowActionModal(null)}
        />
      )}
    </div>
  );
}

interface DeviceActionModalProps {
  device: any;
  currentAction?: DeviceAction;
  onSave: (action: DeviceAction) => void;
  onClose: () => void;
}

function DeviceActionModal({ device, currentAction, onSave, onClose }: DeviceActionModalProps) {
  const [action, setAction] = useState<DeviceAction>(
    currentAction || {
      deviceId: device.id,
      action: 'nothing',
      condition: 'good',
      notes: '',
      estimatedValue: device.price * 0.7 // 70% of original price as default
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(action);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Device Action - {device.name}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Select Action
                  </label>
                  <div className="mt-2 grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setAction({ ...action, action: 'stock' })}
                      className={`flex flex-col items-center p-3 rounded-lg border ${
                        action.action === 'stock'
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-300 hover:border-green-500'
                      }`}
                    >
                      <Archive className={`w-6 h-6 ${
                        action.action === 'stock' ? 'text-green-600' : 'text-gray-400'
                      }`} />
                      <span className="mt-2 text-sm font-medium">Move to Stock</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAction({ ...action, action: 'sell' })}
                      className={`flex flex-col items-center p-3 rounded-lg border ${
                        action.action === 'sell'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-blue-500'
                      }`}
                    >
                      <DollarSign className={`w-6 h-6 ${
                        action.action === 'sell' ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                      <span className="mt-2 text-sm font-medium">Sell Device</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAction({ ...action, action: 'nothing' })}
                      className={`flex flex-col items-center p-3 rounded-lg border ${
                        action.action === 'nothing'
                          ? 'border-gray-500 bg-gray-50'
                          : 'border-gray-300 hover:border-gray-500'
                      }`}
                    >
                      <AlertCircle className={`w-6 h-6 ${
                        action.action === 'nothing' ? 'text-gray-600' : 'text-gray-400'
                      }`} />
                      <span className="mt-2 text-sm font-medium">No Action</span>
                    </button>
                  </div>
                </div>

                {action.action !== 'nothing' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Device Condition
                      </label>
                      <select
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={action.condition}
                        onChange={(e) => setAction({ ...action, condition: e.target.value })}
                      >
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="fair">Fair</option>
                        <option value="poor">Poor</option>
                      </select>
                    </div>

                    {action.action === 'sell' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Estimated Value
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="number"
                            className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={action.estimatedValue}
                            onChange={(e) => setAction({ ...action, estimatedValue: parseFloat(e.target.value) })}
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Notes
                      </label>
                      <textarea
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={action.notes}
                        onChange={(e) => setAction({ ...action, notes: e.target.value })}
                        placeholder="Add any additional notes about the device..."
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Save Action
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}