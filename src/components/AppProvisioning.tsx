import React, { useState, useEffect } from 'react';
import { Plus, Filter } from 'lucide-react';
import { AppSetup, License } from '../types';
import AppSetupList from './apps/AppSetupList';
import LicenseManagement from './apps/LicenseManagement';
import SetupProgress from './apps/SetupProgress';
import AppLibrary from './apps/AppLibrary';
import LicenseLibrary from './apps/LicenseLibrary';

interface Props {
  data: AppSetup[];
  updateData: (data: AppSetup[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const DEFAULT_APPS: AppSetup[] = [
  {
    id: 'slack',
    name: 'Slack',
    category: 'Communication',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/slack-2752072-2284889.png',
    status: 'pending',
    steps: [
      {
        id: 'slack-1',
        title: 'Create Slack Account',
        description: 'Generate user account with company email',
        status: 'pending',
        automated: true
      },
      {
        id: 'slack-2',
        title: 'Add to Channels',
        description: 'Add to #general, #announcements, and team channels',
        status: 'pending',
        automated: true
      },
      {
        id: 'slack-3',
        title: 'Configure Profile',
        description: 'Set up profile picture and details',
        status: 'pending',
        automated: false
      }
    ]
  },
  {
    id: 'gsuite',
    name: 'Google Workspace',
    category: 'Productivity',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/google-2752069-2284886.png',
    status: 'pending',
    steps: [
      {
        id: 'gsuite-1',
        title: 'Create Google Account',
        description: 'Set up company email and Google Workspace',
        status: 'pending',
        automated: true
      },
      {
        id: 'gsuite-2',
        title: 'Configure Calendar',
        description: 'Set up calendar sharing and working hours',
        status: 'pending',
        automated: true
      },
      {
        id: 'gsuite-3',
        title: 'Setup Drive Access',
        description: 'Grant access to team drives and shared folders',
        status: 'pending',
        automated: true
      }
    ]
  }
];

const DEFAULT_LICENSES: License[] = [
  {
    id: 'windows-11-pro',
    name: 'Windows 11 Pro',
    provider: 'Microsoft',
    type: 'perpetual',
    cost: 199.99,
    status: 'pending'
  }
];

export default function AppProvisioning({ data = [], updateData, onNext, onBack }: Props) {
  const [activeTab, setActiveTab] = useState<'apps' | 'licenses'>('apps');
  const [apps, setApps] = useState<AppSetup[]>(data.length ? data : DEFAULT_APPS);
  const [licenses, setLicenses] = useState<License[]>(DEFAULT_LICENSES);
  const [showAppLibrary, setShowAppLibrary] = useState(false);
  const [showLicenseLibrary, setShowLicenseLibrary] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    if (data.length === 0) {
      setApps(DEFAULT_APPS);
      updateData(DEFAULT_APPS);
    }
  }, [data, updateData]);

  const handleAppUpdate = (updatedApps: AppSetup[]) => {
    setApps(updatedApps);
    updateData(updatedApps);
  };

  const handleLicenseUpdate = (updatedLicenses: License[]) => {
    setLicenses(updatedLicenses);
  };

  const handleAddApp = (newApp: AppSetup) => {
    const updatedApps = [...apps, newApp];
    setApps(updatedApps);
    updateData(updatedApps);
    setShowAppLibrary(false);
  };

  const handleAddLicense = (newLicense: License) => {
    setLicenses([...licenses, newLicense]);
    setShowLicenseLibrary(false);
  };

  const filteredApps = filterCategory === 'all' 
    ? apps 
    : apps.filter(app => app.category.toLowerCase() === filterCategory.toLowerCase());

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Overview */}
      <SetupProgress apps={apps} licenses={licenses} />

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Tabs and Actions */}
        <div className="border-b border-gray-200">
          <div className="flex items-center justify-between px-6">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('apps')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'apps'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Apps & Services
              </button>
              <button
                onClick={() => setActiveTab('licenses')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'licenses'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Software Licenses
              </button>
            </nav>
            <div className="flex items-center space-x-4">
              {activeTab === 'apps' && (
                <>
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <select
                      className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                    >
                      <option value="all">All Categories</option>
                      <option value="communication">Communication</option>
                      <option value="productivity">Productivity</option>
                      <option value="development">Development</option>
                      <option value="design">Design</option>
                      <option value="security">Security</option>
                    </select>
                  </div>
                  <button
                    onClick={() => setShowAppLibrary(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add App
                  </button>
                </>
              )}
              {activeTab === 'licenses' && (
                <button
                  onClick={() => setShowLicenseLibrary(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add License
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'apps' ? (
            <AppSetupList apps={filteredApps} onUpdate={handleAppUpdate} />
          ) : (
            <LicenseManagement licenses={licenses} onUpdate={handleLicenseUpdate} />
          )}
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
          className="px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Continue
        </button>
      </div>

      {/* Modals */}
      {showAppLibrary && (
        <AppLibrary
          onAddApp={handleAddApp}
          onClose={() => setShowAppLibrary(false)}
          existingApps={apps}
        />
      )}
      {showLicenseLibrary && (
        <LicenseLibrary
          onAddLicense={handleAddLicense}
          onClose={() => setShowLicenseLibrary(false)}
          existingLicenses={licenses}
        />
      )}
    </div>
  );
}