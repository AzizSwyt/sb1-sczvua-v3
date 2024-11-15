import React, { useState } from 'react';
import { Key, Shield, Settings, AlertCircle, Check } from 'lucide-react';

interface SSOProvider {
  id: string;
  name: string;
  logo: string;
  description: string;
  status: 'configured' | 'not_configured';
}

const SSO_PROVIDERS: SSOProvider[] = [
  {
    id: 'okta',
    name: 'Okta',
    logo: 'https://cdn.iconscout.com/icon/free/png-256/okta-282815.png',
    description: 'Enterprise-grade identity management',
    status: 'not_configured'
  },
  {
    id: 'azure-ad',
    name: 'Azure AD',
    logo: 'https://cdn.iconscout.com/icon/free/png-256/azure-1868965-1583129.png',
    description: 'Microsoft identity and access management',
    status: 'not_configured'
  },
  {
    id: 'google',
    name: 'Google Workspace',
    logo: 'https://cdn.iconscout.com/icon/free/png-256/google-2752069-2284886.png',
    description: 'Google Cloud Identity and SSO',
    status: 'not_configured'
  },
  {
    id: 'onelogin',
    name: 'OneLogin',
    logo: 'https://cdn.iconscout.com/icon/free/png-256/onelogin-282816.png',
    description: 'Unified access management platform',
    status: 'not_configured'
  }
];

export default function SSOSettings() {
  const [providers, setProviders] = useState<SSOProvider[]>(SSO_PROVIDERS);
  const [selectedProvider, setSelectedProvider] = useState<SSOProvider | null>(null);
  const [showConfig, setShowConfig] = useState(false);

  const handleConfigure = (provider: SSOProvider) => {
    setSelectedProvider(provider);
    setShowConfig(true);
  };

  const handleSaveConfig = () => {
    if (selectedProvider) {
      setProviders(providers.map(p =>
        p.id === selectedProvider.id
          ? { ...p, status: 'configured' as const }
          : p
      ));
      setShowConfig(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Single Sign-On (SSO)</h3>
        <p className="mt-1 text-sm text-gray-500">
          Configure SSO to enable secure authentication for your organization
        </p>
      </div>

      {/* SSO Status */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">SSO Status</h4>
              <p className="text-sm text-gray-500">
                {providers.some(p => p.status === 'configured')
                  ? 'SSO is enabled for your organization'
                  : 'SSO is not configured'}
              </p>
            </div>
          </div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            providers.some(p => p.status === 'configured')
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {providers.some(p => p.status === 'configured') ? 'Active' : 'Not Configured'}
          </span>
        </div>
      </div>

      {/* Provider Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {providers.map(provider => (
          <div
            key={provider.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={provider.logo}
                  alt={provider.name}
                  className="w-12 h-12 rounded-lg"
                />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{provider.name}</h4>
                  <p className="text-sm text-gray-500">{provider.description}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                provider.status === 'configured'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {provider.status === 'configured' ? 'Configured' : 'Not Configured'}
              </span>
            </div>

            <div className="mt-6">
              <button
                onClick={() => handleConfigure(provider)}
                className={`w-full inline-flex items-center justify-center px-4 py-2 border rounded-lg text-sm font-medium ${
                  provider.status === 'configured'
                    ? 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                    : 'border-transparent text-white bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                <Settings className="w-4 h-4 mr-2" />
                {provider.status === 'configured' ? 'Modify Settings' : 'Configure'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Configuration Modal */}
      {showConfig && selectedProvider && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg font-medium text-gray-900">
                      Configure {selectedProvider.name}
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Client ID
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Client Secret
                        </label>
                        <input
                          type="password"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          SSO URL
                        </label>
                        <input
                          type="url"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Certificate
                        </label>
                        <textarea
                          rows={4}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          placeholder="Paste your IdP certificate here..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleSaveConfig}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save Configuration
                </button>
                <button
                  type="button"
                  onClick={() => setShowConfig(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}