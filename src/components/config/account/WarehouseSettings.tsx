import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Warehouse, MapPin, Check } from 'lucide-react';

interface Warehouse {
  id: string;
  name: string;
  type: 'owned' | 'swyt';
  address?: string;
  city: string;
  state?: string;
  country: string;
  capacity?: string;
}

const SWYT_WAREHOUSES: Warehouse[] = [
  {
    id: 'swyt-1',
    name: 'Swyt Logistics Center - West',
    type: 'swyt',
    city: 'Los Angeles',
    state: 'CA',
    country: 'United States',
    capacity: '50,000 sq ft'
  },
  {
    id: 'swyt-2',
    name: 'Swyt Distribution Hub - East',
    type: 'swyt',
    city: 'New York',
    state: 'NY',
    country: 'United States',
    capacity: '75,000 sq ft'
  }
];

const INITIAL_WAREHOUSES: Warehouse[] = [
  {
    id: '1',
    name: 'Main Distribution Center',
    type: 'owned',
    address: '456 Logistics Way',
    city: 'Chicago',
    state: 'IL',
    country: 'United States',
    capacity: '25,000 sq ft'
  }
];

export default function WarehouseSettings() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>(INITIAL_WAREHOUSES);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingWarehouse, setEditingWarehouse] = useState<Warehouse | null>(null);
  const [showSwytModal, setShowSwytModal] = useState(false);

  const handleDelete = (warehouseId: string) => {
    setWarehouses(warehouses.filter(w => w.id !== warehouseId));
  };

  const handleEdit = (warehouse: Warehouse) => {
    setEditingWarehouse(warehouse);
    setShowAddModal(true);
  };

  const handleAddSwytWarehouse = (warehouse: Warehouse) => {
    setWarehouses([...warehouses, { ...warehouse, id: Date.now().toString() }]);
    setShowSwytModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Warehouses</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your storage facilities and Swyt warehouse connections
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowSwytModal(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Swyt Warehouse
          </button>
          <button
            onClick={() => {
              setEditingWarehouse(null);
              setShowAddModal(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Own Warehouse
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {warehouses.map(warehouse => (
          <div
            key={warehouse.id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Warehouse className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {warehouse.name}
                    </h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      warehouse.type === 'swyt'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {warehouse.type === 'swyt' ? 'Swyt Warehouse' : 'Own Warehouse'}
                    </span>
                  </div>
                </div>
                {warehouse.type === 'owned' && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(warehouse)}
                      className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-gray-50"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(warehouse.id)}
                      className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-start text-sm">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 mr-2" />
                  <div>
                    {warehouse.address && (
                      <p className="text-gray-900">{warehouse.address}</p>
                    )}
                    <p className="text-gray-500">
                      {warehouse.city}{warehouse.state ? `, ${warehouse.state}` : ''}
                    </p>
                    <p className="text-gray-500">{warehouse.country}</p>
                  </div>
                </div>
                {warehouse.capacity && (
                  <p className="text-sm text-gray-500">
                    Capacity: {warehouse.capacity}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <AddWarehouseModal
          warehouse={editingWarehouse}
          onSave={(warehouse) => {
            if (editingWarehouse) {
              setWarehouses(warehouses.map(w => w.id === warehouse.id ? warehouse : w));
            } else {
              setWarehouses([...warehouses, { ...warehouse, id: Date.now().toString() }]);
            }
            setShowAddModal(false);
            setEditingWarehouse(null);
          }}
          onClose={() => {
            setShowAddModal(false);
            setEditingWarehouse(null);
          }}
        />
      )}

      {showSwytModal && (
        <SwytWarehouseModal
          existingWarehouses={warehouses}
          onSelect={handleAddSwytWarehouse}
          onClose={() => setShowSwytModal(false)}
        />
      )}
    </div>
  );
}

interface AddWarehouseModalProps {
  warehouse?: Warehouse | null;
  onSave: (warehouse: Warehouse) => void;
  onClose: () => void;
}

function AddWarehouseModal({ warehouse, onSave, onClose }: AddWarehouseModalProps) {
  const [formData, setFormData] = useState<Warehouse>(
    warehouse || {
      id: '',
      name: '',
      type: 'owned',
      address: '',
      city: '',
      state: '',
      country: '',
      capacity: ''
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {warehouse ? 'Edit Warehouse' : 'Add Warehouse'}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Warehouse Name
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      State/Province
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Storage Capacity
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 25,000 sq ft"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                {warehouse ? 'Save Changes' : 'Add Warehouse'}
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

interface SwytWarehouseModalProps {
  existingWarehouses: Warehouse[];
  onSelect: (warehouse: Warehouse) => void;
  onClose: () => void;
}

function SwytWarehouseModal({ existingWarehouses, onSelect, onClose }: SwytWarehouseModalProps) {
  const availableWarehouses = SWYT_WAREHOUSES.filter(
    sw => !existingWarehouses.some(ew => ew.id === sw.id)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="inline-block align-bottom bg-white rounded-lg text- left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Add Swyt Warehouse
            </h3>

            <div className="space-y-4">
              {availableWarehouses.length === 0 ? (
                <p className="text-sm text-gray-500">
                  All available Swyt warehouses have been added to your account.
                </p>
              ) : (
                availableWarehouses.map(warehouse => (
                  <div
                    key={warehouse.id}
                    className="flex items-start p-4 border border-gray-200 rounded-lg hover:border-indigo-500 cursor-pointer"
                    onClick={() => onSelect(warehouse)}
                  >
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{warehouse.name}</h4>
                      <div className="mt-1 text-sm text-gray-500">
                        <p>{warehouse.city}, {warehouse.state}</p>
                        <p>{warehouse.country}</p>
                        {warehouse.capacity && (
                          <p className="mt-1">Capacity: {warehouse.capacity}</p>
                        )}
                      </div>
                    </div>
                    <div className="ml-4">
                      <Plus className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                ))
              )}
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