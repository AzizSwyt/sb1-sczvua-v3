import React, { useState } from 'react';
import { AppWindow, Check, AlertCircle, Calendar, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  data: any[];
  updateData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function AppDeprovisioning({ data, updateData, onNext, onBack }: Props) {
  const [expandedApp, setExpandedApp] = useState<string | null>(null);
  const [appActions, setAppActions] = useState<Record<string, any>>({});

  // Mock data for assigned apps
  const assignedApps = [
    {
      id: 'slack',
      name: 'Slack',
      icon: 'https://cdn.iconscout.com/icon/free/png-256/slack-2752072-2284889.png',
      category: 'Communication',
      actions: [
        'Remove from all channels',
        'Deactivate account',
        'Archive data'
      ]
    },
    {
      id: 'gsuite',
      name: 'Google Workspace',
      icon: 'https://cdn.iconscout.com/icon/free/png-256/google-2752069-2284886.png',
      category: 'Productivity',
      actions: [
        'Reset password',
        'Remove from groups',
        'Transfer Drive files',
        'Set up email auto-response',
        'Schedule account deletion'
      ]
    }
  ];

  const handleActionUpdate = (appId: string, action: any) => {
    const updatedActions = {
      ...appActions,
      [appId]: {
        ...(appActions[appId] || {}),
        ...action
      }
    };
    setAppActions(updatedActions);
    updateData(updatedActions);
  };

  const handleSubmit = () => {
    updateData(appActions);
    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900">App & License Deprovisioning</h2>
        <p className="mt-1 text-sm text-gray-500">
          Schedule and manage app access revocation
        </p>

        <div className="mt-6 space-y-6">
          {assignedApps.map(app => (
            <div key={app.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={app.icon}
                    alt={app.name}
                    className="w-12 h-12 rounded-lg"
                  />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{app.name}</h3>
                    <p className="text-sm text-gray-500">{app.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => setExpandedApp(expandedApp === app.id ? null : app.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {expandedApp === app.id ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>

              {expandedApp === app.id && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Scheduled Date
                    </label>
                    <input
                      type="date"
                      className="mt-1 block w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                      value={appActions[app.id]?.scheduledDate || ''}
                      onChange={(e) => handleActionUpdate(app.id, { scheduledDate: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Required Actions
                    </label>
                    <ul className="mt-2 space-y-2">
                      {app.actions.map((action, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            checked={appActions[app.id]?.completedActions?.includes(action) || false}
                            onChange={(e) => {
                              const completedActions = appActions[app.id]?.completedActions || [];
                              handleActionUpdate(app.id, {
                                completedActions: e.target.checked
                                  ? [...completedActions, action]
                                  : completedActions.filter((a: string) => a !== action)
                              });
                            }}
                          />
                          <span className="text-sm text-gray-700">{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Notes
                    </label>
                    <textarea
                      rows={3}
                      className="mt-1 block w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                      value={appActions[app.id]?.notes || ''}
                      onChange={(e) => handleActionUpdate(app.id, { notes: e.target.value })}
                      placeholder="Add any special instructions or notes..."
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Continue
        </button>
      </div>
    </div>
  );
}