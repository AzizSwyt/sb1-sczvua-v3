import React from 'react';
import { Play, CheckCircle, XCircle, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { AppSetup, AppSetupStep } from '../../types';

interface Props {
  apps: AppSetup[];
  onUpdate: (apps: AppSetup[]) => void;
}

export default function AppSetupList({ apps = [], onUpdate }: Props) {
  const [expandedApp, setExpandedApp] = React.useState<string | null>(null);

  const toggleExpand = (appId: string) => {
    setExpandedApp(expandedApp === appId ? null : appId);
  };

  const startSetup = (appId: string) => {
    const updatedApps = apps.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          status: 'pending',
          steps: app.steps.map(step => ({
            ...step,
            status: step.automated ? 'in_progress' : 'pending'
          }))
        };
      }
      return app;
    });
    onUpdate(updatedApps);

    // Simulate automated steps
    setTimeout(() => {
      const completedApps = updatedApps.map(app => {
        if (app.id === appId) {
          return {
            ...app,
            status: 'completed',
            steps: app.steps.map(step => ({
              ...step,
              status: step.automated ? 'completed' : 'pending'
            }))
          };
        }
        return app;
      });
      onUpdate(completedApps);
    }, 2000);
  };

  const getStepIcon = (status: AppSetupStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'in_progress':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-gray-300" />;
    }
  };

  const isAppReady = (app: AppSetup) => {
    if (!app.dependencies) return true;
    return app.dependencies.every(depId => 
      apps.find(a => a.id === depId)?.status === 'completed'
    );
  };

  if (!apps.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No apps configured for setup.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {apps.map(app => {
        const isExpanded = expandedApp === app.id;
        const isReady = isAppReady(app);

        return (
          <div key={app.id} className="border rounded-lg overflow-hidden">
            <div className="bg-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={app.icon}
                    alt={app.name}
                    className="w-10 h-10 rounded-lg"
                  />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{app.name}</h3>
                    <p className="text-sm text-gray-500">{app.category}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {app.status !== 'completed' && (
                    <button
                      onClick={() => startSetup(app.id)}
                      disabled={!isReady}
                      className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium ${
                        isReady
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Start Setup
                    </button>
                  )}
                  <button
                    onClick={() => toggleExpand(app.id)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              {!isReady && app.dependencies && (
                <div className="mt-2 text-sm text-yellow-600">
                  Waiting for: {app.dependencies.map(depId => 
                    apps.find(a => a.id === depId)?.name
                  ).join(', ')}
                </div>
              )}
            </div>

            {isExpanded && (
              <div className="border-t bg-gray-50 p-4">
                <div className="space-y-4">
                  {app.steps.map(step => (
                    <div
                      key={step.id}
                      className="flex items-start space-x-3"
                    >
                      {getStepIcon(step.status)}
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {step.title}
                          {step.automated && (
                            <span className="ml-2 text-xs font-normal text-gray-500">
                              (Automated)
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-gray-500">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}