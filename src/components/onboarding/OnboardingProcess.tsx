import React, { useState } from 'react';
import { Workflow, Settings, Users, Package, AppWindow, CheckCircle } from 'lucide-react';
import Stepper from '../shared/Stepper';
import EmployeeInfo from '../EmployeeInfo';
import DeviceAssignment from '../DeviceAssignment';
import DeliveryDetails from '../DeliveryDetails';
import TaskAssignment from '../TaskAssignment';
import AppProvisioning from '../AppProvisioning';
import Summary from '../Summary';
import { OnboardingData } from '../../types';

const STEPS = [
  { 
    id: 1, 
    title: 'Employee Info', 
    description: 'Basic information and role',
    icon: Users 
  },
  { 
    id: 2, 
    title: 'Devices', 
    description: 'Hardware setup',
    icon: Package 
  },
  { 
    id: 3, 
    title: 'Delivery', 
    description: 'Shipping details',
    icon: Package 
  },
  { 
    id: 4, 
    title: 'Tasks', 
    description: 'Onboarding checklist',
    icon: Workflow 
  },
  { 
    id: 5, 
    title: 'Apps', 
    description: 'Software access',
    icon: AppWindow 
  },
  { 
    id: 6, 
    title: 'Review', 
    description: 'Final confirmation',
    icon: CheckCircle 
  },
];

export default function OnboardingProcess() {
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    employee: {} as any,
    devices: [],
    delivery: null,
    tasks: [],
    apps: [],
  });

  const updateData = (key: keyof OnboardingData, value: any) => {
    setOnboardingData(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <EmployeeInfo
            data={onboardingData.employee}
            updateData={(data) => updateData('employee', data)}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <DeviceAssignment
            data={onboardingData.devices}
            updateData={(data) => updateData('devices', data)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <DeliveryDetails
            data={onboardingData.delivery}
            updateData={(data) => updateData('delivery', data)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <TaskAssignment
            data={onboardingData.tasks}
            updateData={(data) => updateData('tasks', data)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <AppProvisioning
            data={onboardingData.apps}
            updateData={(data) => updateData('apps', data)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 6:
        return (
          <Summary
            data={onboardingData}
            onBack={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex items-center space-x-2 mb-8">
            <Settings className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Employee Onboarding</h1>
          </div>

          <Stepper steps={STEPS} currentStep={currentStep} variant="onboarding" />

          <div className="mt-20">{renderStep()}</div>
        </div>
      </div>
    </div>
  );
}