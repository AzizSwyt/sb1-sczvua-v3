import React, { useState } from 'react';
import { Tabs } from '../shared/Tabs';
import DomainSettings from './account/DomainSettings';
import SSOSettings from './account/SSOSettings';
import DefaultTasksSettings from './account/DefaultTasksSettings';
import DefaultAppsSettings from './account/DefaultAppsSettings';
import DefaultLicensesSettings from './account/DefaultLicensesSettings';
import HardwareSettings from './account/HardwareSettings';
import DepartmentSettings from './account/DepartmentSettings';

export default function AccountSettings() {
  const [activeTab, setActiveTab] = useState('domains');

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-900">Account Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Configure your company's global settings and defaults
          </p>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={setActiveTab}
          tabs={[
            { id: 'domains', label: 'Domains', icon: 'Globe' },
            { id: 'sso', label: 'SSO', icon: 'Key' },
            { id: 'departments', label: 'Departments', icon: 'Building' },
            { id: 'hardware', label: 'Hardware', icon: 'Package' },
            { id: 'tasks', label: 'Default Tasks', icon: 'CheckSquare' },
            { id: 'apps', label: 'Default Apps', icon: 'AppWindow' },
            { id: 'licenses', label: 'Default Licenses', icon: 'CreditCard' },
          ]}
        />

        {/* Content */}
        <div className="p-8">
          {activeTab === 'domains' && <DomainSettings />}
          {activeTab === 'sso' && <SSOSettings />}
          {activeTab === 'departments' && <DepartmentSettings />}
          {activeTab === 'hardware' && <HardwareSettings />}
          {activeTab === 'tasks' && <DefaultTasksSettings />}
          {activeTab === 'apps' && <DefaultAppsSettings />}
          {activeTab === 'licenses' && <DefaultLicensesSettings />}
        </div>
      </div>
    </div>
  );
}