import React, { useState } from 'react';
import { Globe, Plus, Trash2, Check, X } from 'lucide-react';

interface Domain {
  id: string;
  name: string;
  status: 'verified' | 'pending' | 'failed';
  primary: boolean;
}

export default function DomainSettings() {
  const [domains, setDomains] = useState<Domain[]>([
    {
      id: '1',
      name: 'example.com',
      status: 'verified',
      primary: true,
    }
  ]);
  const [newDomain, setNewDomain] = useState('');

  const addDomain = () => {
    if (newDomain && !domains.some(d => d.name === newDomain)) {
      setDomains([
        ...domains,
        {
          id: Date.now().toString(),
          name: newDomain,
          status: 'pending',
          primary: domains.length === 0,
        }
      ]);
      setNewDomain('');
    }
  };

  const removeDomain = (id: string) => {
    setDomains(domains.filter(d => d.id !== id));
  };

  const setPrimaryDomain = (id: string) => {
    setDomains(domains.map(d => ({
      ...d,
      primary: d.id === id,
    })));
  };

  const getStatusBadge = (status: Domain['status']) => {
    switch (status) {
      case 'verified':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Check className="w-3 h-3 mr-1" />
            Verified
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Globe className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <X className="w-3 h-3 mr-1" />
            Failed
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Company Domains</h3>
        <p className="mt-1 text-sm text-gray-500">
          Add and manage the domains associated with your company
        </p>
      </div>

      {/* Add Domain Form */}
      <div className="flex space-x-4">
        <div className="flex-1">
          <label htmlFor="domain" className="sr-only">
            Domain Name
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
              https://
            </span>
            <input
              type="text"
              name="domain"
              id="domain"
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="example.com"
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={addDomain}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Domain
        </button>
      </div>

      {/* Domains List */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <ul className="divide-y divide-gray-200">
          {domains.map((domain) => (
            <li key={domain.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Globe className={`w-5 h-5 ${
                    domain.primary ? 'text-indigo-600' : 'text-gray-400'
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {domain.name}
                      {domain.primary && (
                        <span className="ml-2 text-xs text-indigo-600 font-normal">
                          Primary
                        </span>
                      )}
                    </p>
                    <div className="mt-1">
                      {getStatusBadge(domain.status)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {!domain.primary && domain.status === 'verified' && (
                    <button
                      onClick={() => setPrimaryDomain(domain.id)}
                      className="text-sm text-indigo-600 hover:text-indigo-900"
                    >
                      Make Primary
                    </button>
                  )}
                  {!domain.primary && (
                    <button
                      onClick={() => removeDomain(domain.id)}
                      className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

     
    </div>
  );
}