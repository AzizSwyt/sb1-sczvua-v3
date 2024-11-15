import React from 'react';
import { MapPin, Calendar, ClipboardList, FileText } from 'lucide-react';
import { DeliveryInfo } from '../types';

interface Props {
  data: Partial<DeliveryInfo> | null; // Allowing null
  updateData: (data: Partial<DeliveryInfo>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function DeliveryDetails({ data, updateData, onNext, onBack }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  // Ensure data is initialized with default values if null
  const safeData = data || {
    address: '',
    city: '',
    state: '',
    zipCode: '',
    deliveryDate: '',
    instructions: '',
  };

  const InputField = ({
    icon: Icon,
    label,
    type,
    value,
    onChange,
    isTextArea = false,
  }: {
    icon: React.ComponentType<any>;
    label: string;
    type: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    isTextArea?: boolean;
  }) => (
    <div className="relative overflow-hidden">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        {isTextArea ? (
          <textarea
            rows={3}
            className="block w-full pl-10 pr-4 py-2.5 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition duration-150 ease-in-out"
            value={value || ''}
            onChange={onChange}
          />
        ) : (
          <input
            type={type}
            className="block w-full pl-10 pr-4 py-2.5 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition duration-150 ease-in-out"
            value={value || ''}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-xl font-semibold text-gray-900">Delivery Details</h2>
          <p className="mt-1 text-sm text-gray-500">
            Provide delivery information for the order. All fields are optional.
          </p>
        </div>

        <InputField
          icon={MapPin}
          label="Street Address"
          type="text"
          value={safeData.address}
          onChange={(e) => updateData({ ...safeData, address: e.target.value })}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InputField
            icon={MapPin}
            label="City"
            type="text"
            value={safeData.city}
            onChange={(e) => updateData({ ...safeData, city: e.target.value })}
          />
          <InputField
            icon={MapPin}
            label="State"
            type="text"
            value={safeData.state}
            onChange={(e) => updateData({ ...safeData, state: e.target.value })}
          />
          <InputField
            icon={ClipboardList}
            label="ZIP Code"
            type="text"
            value={safeData.zipCode}
            onChange={(e) => updateData({ ...safeData, zipCode: e.target.value })}
          />
        </div>

        <InputField
          icon={Calendar}
          label="Preferred Delivery Date"
          type="date"
          value={safeData.deliveryDate}
          onChange={(e) => updateData({ ...safeData, deliveryDate: e.target.value })}
        />

        <InputField
          icon={FileText}
          label="Special Instructions"
          type="text"
          value={safeData.instructions}
          onChange={(e) => updateData({ ...safeData, instructions: e.target.value })}
          isTextArea
        />
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Back
        </button>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Next Step
        </button>
      </div>
    </form>
  );
}
