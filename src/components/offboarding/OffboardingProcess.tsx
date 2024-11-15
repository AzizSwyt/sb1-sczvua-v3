import React, { useState } from 'react';
import { Settings, Package, AppWindow, CheckCircle, Users, CheckSquare } from 'lucide-react';
import Stepper from '../shared/Stepper';
import EmployeeInfo from './steps/EmployeeInfo';
import DeviceDeprovisioning from './steps/DeviceDeprovisioning';
import AppDeprovisioning from './steps/AppDeprovisioning';
import TaskTracking from './steps/TaskTracking';
import Summary from './steps/Summary';

const STEPS = [
  { 
    id: 1, 
    title: 'Employee Info', 
    description: 'Basic details and dates',
    icon: Users 
  },
  { 
    id: 2, 
    title: 'Devices', 
    description: 'Hardware collection',
    icon: Package 
  },
  { 
    id: 3, 
    title: 'Apps & Licenses', 
    description: 'Access revocation',
    icon: AppWindow 
  },
  {
    id: 4,
    title: 'Tasks',
    description: 'Offboarding checklist',
    icon: CheckSquare
  },
  { 
    id: 5, 
    title: 'Review', 
    description: 'Final checklist',
    icon: CheckCircle 
  },
];

export default function OffboardingProcess() {
  const [currentStep, setCurrentStep] = useState(1);
  const [offboardingData, setOffboardingData] = useState({
    employee: {},
    devices: [],
    apps: {},
    tasks: [],
    schedule: null
  });

  const updateData = (key: string, value: any) => {
    setOffboardingData(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <EmployeeInfo
            data={offboardingData.employee}
            updateData={(data) => updateData('employee', data)}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <DeviceDeprovisioning
            data={offboardingData.devices}
            updateData={(data) => updateData('devices', data)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <AppDeprovisioning
            data={offboardingData.apps}
            updateData={(data) => updateData('apps', data)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <TaskTracking
            data={offboardingData.tasks}
            updateData={(data) => updateData('tasks', data)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <Summary
            data={offboardingData}
            onBack={prevStep}
            onComplete={() => console.log('Offboarding completed')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex items-center space-x-2 mb-8">
            <Settings className="w-8 h-8 text-red-600" />
            <h1 className="text-2xl font-bold text-gray-900">Employee Offboarding</h1>
          </div>

          <Stepper steps={STEPS} currentStep={currentStep} variant="offboarding" />

          <div className="mt-20">{renderStep()}</div>
        </div>
      </div>
    </div>
  );
}