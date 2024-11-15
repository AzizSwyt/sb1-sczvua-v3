import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Building2, MapPin } from 'lucide-react';

interface Office {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  isHeadquarters?: boolean;
}

const INITIAL_OFFICES: Office[] = [
  {
    id: '1',
    name: 'Global Headquarters',
    address: '123 Tech Park Avenue',
    city: 'San Francisco',
    state: 'CA',
    country: 'United States',
    isHeadquarters: true
  }
];

export default function OfficeSettings() {
  const [offices, setOffices] = useState<Office[]>(INITIAL_OFFICES);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingOffice, setEditingOffice] = useState<Office | null>(null);

  const handleDelete = (officeId: string) => {
    setOffices(offices.filter(office => office.id !== officeId));
  };

  const handleEdit = (office: Office) => {
    setEditingOffice(office);
    setShowAddModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Office Locations</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your company's office locations worldwide
          </p>
        </div>
        <button
          onClick={() => {
            setEditingOffice(null);
            setShowAddModal(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Office
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offices.map(office => (
          <div
            key={office.id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {office.name}
                      {office.isHeadquarters && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          Headquarters
                        </span>
                      )}
                    </h3>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(office)}
                    className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-gray-50"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(office.id)}
                    className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-start text-sm">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 mr-2" />
                  <div>
                    <p className="text-gray-900">{office.address}</p>
                    <p className="text-gray-500">
                      {office.city}, {office.state}
                    </p>
                    <p className="text-gray-500">{office.country}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <AddOfficeModal
          office={editingOffice}
          onSave={(office) => {
            if (editingOffice) {
              setOffices(offices.map(o => o.id === office.id ? office : o));
            } else {
              setOffices([...offices, { ...office, id: Date.now().toString() }]);
            }
            setShowAddModal(false);
            setEditingOffice(null);
          }}
          onClose={() => {
            setShowAddModal(false);
            setEditingOffice(null);
          }}
        />
      )}
    </div>
  );
}

interface AddOfficeModalProps {
  office?: Office | null;
  onSave: (office: Office) => void;
  onClose: () => void;
}

function AddOfficeModal({ office, onSave, onClose }: AddOfficeModalProps) {
  const [formData, setFormData] = useState<Office>(
    office || {
      id: '',
      name: '',
      address: '',
      city: '',
      state: '',
      country: '',
      isHeadquarters: false
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
                {office ? 'Edit Office' : 'Add Office'}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Office Name
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
                      required
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
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      checked={formData.isHeadquarters}
                      onChange={(e) => setFormData({ ...formData, isHeadquarters: e.target.checked })}
                    />
                    <span className="ml-2 text-sm text-gray-700">This is our headquarters</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                {office ? 'Save Changes' : 'Add Office'}
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