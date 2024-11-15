<content>import React, { useState } from 'react';
import { Tabs } from '../shared/Tabs';
import DomainSettings from './account/DomainSettings';
import SSOSettings from './account/SSOSettings';
import DefaultTasksSettings from './account/DefaultTasksSettings';
import DefaultAppsSettings from './account/DefaultAppsSettings';
import DefaultLicensesSettings from './account/DefaultLicensesSettings';
import HardwareSettings from './account/HardwareSettings';
import DepartmentSettings from '../config/DepartmentSettings';
import OfficeSettings from './account/OfficeSettings';
import WarehouseSettings from './account/WarehouseSettings';
import ServiceProviderSettings from './account/ServiceProviderSettings';
import BillingSettings from './account/BillingSettings';
import PaymentHistorySettings from './account/PaymentHistorySettings';

export default function AccountSettings() {
  const [activeTab, setActiveTab] = useState('domains');

  const renderContent = () => {
    switch (activeTab) {
      case 'domains':
        return <DomainSettings />;
      case 'sso':
        return <SSOSettings />;
      case 'departments':
        return <DepartmentSettings />;
      case 'hardware':
        return <HardwareSettings />;
      case 'tasks':
        return <DefaultTasksSettings />;
      case 'apps':
        return <DefaultAppsSettings />;
      case 'licenses':
        return <DefaultLicensesSettings />;
      case 'offices':
        return <OfficeSettings />;
      case 'warehouses':
        return <WarehouseSettings />;
      case 'providers':
        return <ServiceProviderSettings />;
      case 'billing':
        return <BillingSettings />;
      case 'payment-history':
        return <PaymentHistorySettings />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="bg-white rounded-xl shadow-sm">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <h1 className="text-2xl font-semibold text-gray-900">Company Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your organization's global configuration and defaults
          </p>
        </div>

        {/* Tabs and Content */}
        <div className="flex min-h-[calc(100vh-13rem)]">
          <Tabs
            value={activeTab}
            onChange={setActiveTab}
            orientation="vertical"
            tabs={[
              { 
                id: 'domains', 
                label: 'Domains', 
                icon: 'Globe',
                description: 'Company domains & DNS'
              },
              { 
                id: 'sso', 
                label: 'SSO', 
                icon: 'Key',
                description: 'Single sign-on setup'
              },
              { 
                id: 'departments', 
                label: 'Departments', 
                icon: 'Building',
                description: 'Team structure'
              },
              { 
                id: 'hardware', 
                label: 'Hardware', 
                icon: 'Package',
                description: 'Device management'
              },
              { 
                id: 'tasks', 
                label: 'Tasks', 
                icon: 'CheckSquare',
                description: 'Default workflows'
              },
              { 
                id: 'apps', 
                label: 'Apps', 
                icon: 'AppWindow',
                description: 'Software & services'
              },
              { 
                id: 'licenses', 
                label: 'Licenses', 
                icon: 'CreditCard',
                description: 'Software licenses'
              },
              { 
                id: 'offices', 
                label: 'Offices', 
                icon: 'Building2',
                description: 'Office locations'
              },
              { 
                id: 'warehouses', 
                label: 'Warehouses', 
                icon: 'Warehouse',
                description: 'Storage facilities'
              },
              { 
                id: 'providers', 
                label: 'Service Providers', 
                icon: 'Truck',
                description: 'External services'
              },
              { 
                id: 'billing', 
                label: 'Billing', 
                icon: 'DollarSign',
                description: 'Plans & payment methods'
              },
              { 
                id: 'payment-history', 
                label: 'Payment History', 
                icon: 'Receipt',
                description: 'Invoices & transactions'
              },
            ]}
          />
          <div className="flex-1 p-6 bg-gray-50">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}</content>