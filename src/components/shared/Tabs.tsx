import React from 'react';
import * as LucideIcons from 'lucide-react';
import { cn } from '../../utils/cn';

interface TabProps {
  value: string;
  onChange: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  tabs: {
    id: string;
    label: string;
    icon: keyof typeof LucideIcons;
    description?: string;
  }[];
}

export function Tabs({ value, onChange, tabs, orientation = 'horizontal' }: TabProps) {
  const Icon = (iconName: keyof typeof LucideIcons) => {
    const LucideIcon = LucideIcons[iconName];
    return <LucideIcon />;
  };

  if (orientation === 'vertical') {
    return (
      <div className="w-72 min-h-full bg-white border-r border-gray-200">
        <nav className="flex flex-col h-full py-2">
          {tabs.map(tab => {
            const isActive = value === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className={cn(
                  'w-full text-left px-4 py-3 flex items-start space-x-3',
                  'hover:bg-gray-50 focus:outline-none relative group',
                  isActive && 'bg-indigo-50'
                )}
              >
                {/* Active Indicator */}
                <div className={cn(
                  'absolute left-0 top-0 bottom-0 w-0.5 bg-indigo-600 transition-all duration-150',
                  isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-hover:bg-gray-300'
                )} />

                <div className={cn(
                  'flex-shrink-0 w-5 h-5',
                  isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500'
                )}>
                  {Icon(tab.icon)}
                </div>

                <div className="flex-1 min-w-0">
                  <p className={cn(
                    'text-sm font-medium truncate',
                    isActive ? 'text-indigo-600' : 'text-gray-900'
                  )}>
                    {tab.label}
                  </p>
                  {tab.description && (
                    <p className={cn(
                      'text-xs truncate',
                      isActive ? 'text-indigo-500' : 'text-gray-500'
                    )}>
                      {tab.description}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    );
  }

  // Horizontal tabs
  return (
    <div className="border-b border-gray-200">
      <nav className="px-8 -mb-px flex space-x-8">
        {tabs.map(tab => {
          const isActive = value === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={cn(
                'group relative py-4 px-1 flex flex-col items-center text-sm font-medium focus:outline-none whitespace-nowrap',
                isActive
                  ? 'text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              <div className="flex items-center space-x-2">
                <div className={cn(
                  "w-5 h-5",
                  isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-500"
                )}>
                  {Icon(tab.icon)}
                </div>
                <span>{tab.label}</span>
              </div>
              
              {tab.description && (
                <span className="text-xs text-gray-500 mt-0.5">
                  {tab.description}
                </span>
              )}

              <div className={cn(
                "absolute bottom-0 left-0 w-full h-0.5 transition-colors duration-200",
                isActive ? "bg-indigo-600" : "bg-transparent group-hover:bg-gray-200"
              )} />
            </button>
          );
        })}
      </nav>
    </div>
  );
}