import React, { useState } from 'react';
import { CreditCard, Building2, Mail, Plus, Edit2, Check } from 'lucide-react';

interface BillingPlan {
  id: string;
  name: string;
  price: number;
  period: 'monthly' | 'annual';
  features: string[];
  licenses: number;
}

interface PaymentMethod {
  id: string;
  type: 'credit_card';
  last4: string;
  expMonth: number;
  expYear: number;
  brand: string;
  isDefault: boolean;
}

interface BillingDetails {
  email: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const AVAILABLE_PLANS: BillingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 49,
    period: 'monthly',
    features: [
      'Up to 10 employees',
      'Basic onboarding workflows',
      'Email support',
      'Basic analytics'
    ],
    licenses: 10
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 99,
    period: 'monthly',
    features: [
      'Up to 50 employees',
      'Advanced workflows',
      'Priority support',
      'Advanced analytics',
      'Custom integrations'
    ],
    licenses: 50
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 299,
    period: 'monthly',
    features: [
      'Unlimited employees',
      'Custom workflows',
      '24/7 support',
      'Advanced security',
      'Dedicated account manager',
      'Custom branding'
    ],
    licenses: -1
  }
];

export default function BillingSettings() {
  const [currentPlan, setCurrentPlan] = useState<BillingPlan>(AVAILABLE_PLANS[1]);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [showAddCard, setShowAddCard] = useState(false);
  const [showEditBilling, setShowEditBilling] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'credit_card',
      last4: '4242',
      expMonth: 12,
      expYear: 2024,
      brand: 'visa',
      isDefault: true
    }
  ]);
  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    email: 'billing@company.com',
    name: 'Company Inc.',
    address: '123 Business St',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    country: 'United States'
  });

  const getAnnualPrice = (monthlyPrice: number) => {
    return Math.floor(monthlyPrice * 12 * 0.9); // 10% discount for annual billing
  };

  return (
    <div className="space-y-8">
      {/* Current Plan */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900">Current Plan</h3>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-xl font-semibold text-gray-900">{currentPlan.name}</h4>
              <p className="text-sm text-gray-500">
                {currentPlan.licenses === -1 
                  ? 'Unlimited employees'
                  : `Up to ${currentPlan.licenses} employees`}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">
                ${billingPeriod === 'monthly' 
                  ? currentPlan.price 
                  : getAnnualPrice(currentPlan.price)}
                <span className="text-sm font-normal text-gray-500">
                  /{billingPeriod === 'monthly' ? 'mo' : 'yr'}
                </span>
              </p>
            </div>
          </div>

          {/* Billing Period Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                billingPeriod === 'monthly'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                billingPeriod === 'annual'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Annual
              <span className="ml-1 text-xs text-green-600">Save 10%</span>
            </button>
          </div>

          {/* Available Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {AVAILABLE_PLANS.map(plan => (
              <div
                key={plan.id}
                className={`rounded-lg border ${
                  plan.id === currentPlan.id
                    ? 'border-indigo-500 ring-2 ring-indigo-200'
                    : 'border-gray-200'
                } p-6`}
              >
                <div className="text-center mb-4">
                  <h5 className="text-lg font-medium text-gray-900">{plan.name}</h5>
                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    ${billingPeriod === 'monthly' 
                      ? plan.price 
                      : getAnnualPrice(plan.price)}
                    <span className="text-sm font-normal text-gray-500">
                      /{billingPeriod === 'monthly' ? 'mo' : 'yr'}
                    </span>
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setCurrentPlan(plan)}
                  className={`w-full py-2 px-4 rounded-lg text-sm font-medium ${
                    plan.id === currentPlan.id
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {plan.id === currentPlan.id ? 'Current Plan' : 'Upgrade'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Payment Methods</h3>
            <button
              onClick={() => setShowAddCard(true)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Payment Method
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {paymentMethods.map(method => (
              <div
                key={method.id}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  method.isDefault ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                    {method.brand === 'visa' && (
                      <img
                        src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/visa.svg"
                        alt="Visa"
                        className="h-4"
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      •••• {method.last4}
                      {method.isDefault && (
                        <span className="ml-2 text-xs text-indigo-600">Default</span>
                      )}
                    </p>
                    <p className="text-sm text-gray-500">
                      Expires {method.expMonth}/{method.expYear}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {!method.isDefault && (
                    <button
                      onClick={() => {
                        setPaymentMethods(methods =>
                          methods.map(m => ({
                            ...m,
                            isDefault: m.id === method.id
                          }))
                        );
                      }}
                      className="text-sm text-indigo-600 hover:text-indigo-700"
                    >
                      Make Default
                    </button>
                  )}
                  <button className="text-sm text-red-600 hover:text-red-700">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Billing Details */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Billing Details</h3>
            <button
              onClick={() => setShowEditBilling(true)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Details
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                <Mail className="w-4 h-4" />
                <span>Billing Email</span>
              </div>
              <p className="text-sm font-medium text-gray-900">{billingDetails.email}</p>
            </div>
            <div>
              <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                <Building2 className="w-4 h-4" />
                <span>Billing Address</span>
              </div>
              <div className="text-sm font-medium text-gray-900">
                <p>{billingDetails.name}</p>
                <p>{billingDetails.address}</p>
                <p>
                  {billingDetails.city}, {billingDetails.state} {billingDetails.zipCode}
                </p>
                <p>{billingDetails.country}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Card Modal */}
      {showAddCard && (
        <AddCardModal onClose={() => setShowAddCard(false)} />
      )}

      {/* Edit Billing Modal */}
      {showEditBilling && (
        <EditBillingModal
          billingDetails={billingDetails}
          onSave={(details) => {
            setBillingDetails(details);
            setShowEditBilling(false);
          }}
          onClose={() => setShowEditBilling(false)}
        />
      )}
    </div>
  );
}

interface AddCardModalProps {
  onClose: () => void;
}

function AddCardModal({ onClose }: AddCardModalProps) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Add Payment Method
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Card Number
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="4242 4242 4242 4242"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Expiration Date
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="MM / YY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    CVC
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="123"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Set as default payment method
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Add Card
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface EditBillingModalProps {
  billingDetails: BillingDetails;
  onSave: (details: BillingDetails) => void;
  onClose: () => void;
}

function EditBillingModal({ billingDetails, onSave, onClose }: EditBillingModalProps) {
  const [formData, setFormData] = useState<BillingDetails>(billingDetails);

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
                Edit Billing Details
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Billing Email
                  </label>
                  <input
                    type="email"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Company Name
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      ZIP/Postal Code
                    </label>
                    <input
                      type="text"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    />
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
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Save Changes
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