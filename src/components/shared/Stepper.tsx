import React from 'react';
import { cn } from '../../utils/cn';

interface StepperProps {
  steps: {
    id: number;
    title: string;
    description: string;
    icon: React.ComponentType<any>;
  }[];
  currentStep: number;
  variant?: 'onboarding' | 'offboarding';
}
export default function Stepper({ steps, currentStep, variant = 'onboarding' }: StepperProps) {
  return (
    <div
      className={cn(
        "w-full py-12 px-6 rounded-xl shadow-sm",
        "mt-12", // Moves the Stepper further down
        variant === 'onboarding'
          ? "bg-gradient-to-r from-indigo-50 to-blue-50"
          : "bg-gradient-to-r from-red-50 to-orange-50"
      )}
      style={{ minHeight: '200px' }} // Direct height adjustment if margin alone doesn't work
    >
      {/* Desktop Stepper */}
      <nav className="hidden md:block">
        <ol className="flex items-center justify-between w-full">
          {steps.map((step, index) => (
            <li
              key={step.id}
              className={cn(
                "relative",
                index !== steps.length - 1 && "flex-1"
              )}
            >
              {index !== steps.length - 1 && (
                <div className="absolute top-1/2 left-[calc(50%+2rem)] w-full h-0.5 -translate-y-1/2">
                  <div
                    className={cn(
                      "h-full transition-all duration-500 ease-in-out",
                      step.id < currentStep
                        ? variant === 'onboarding'
                          ? "bg-indigo-600"
                          : "bg-red-600"
                        : "bg-gray-200"
                    )}
                  />
                </div>
              )}

              <div className="relative flex flex-col items-center group">
                <div
                  className={cn(
                    "w-16 h-16 flex items-center justify-center rounded-full transition-all duration-300",
                    step.id === currentStep && "ring-4",
                    variant === 'onboarding'
                      ? step.id === currentStep && "ring-indigo-100"
                      : step.id === currentStep && "ring-red-100",
                    step.id < currentStep
                      ? variant === 'onboarding'
                        ? "bg-indigo-600"
                        : "bg-red-600"
                      : step.id === currentStep
                      ? variant === 'onboarding'
                        ? "bg-indigo-600 animate-pulse"
                        : "bg-red-600 animate-pulse"
                      : "bg-gray-200"
                  )}
                >
                  <step.icon
                    className={cn(
                      "w-7 h-7",
                      step.id <= currentStep ? "text-white" : "text-gray-500"
                    )}
                  />
                </div>
                <div className="absolute -bottom-14 w-32 text-center space-y-1">
                  <span
                    className={cn(
                      "block text-sm font-medium",
                      step.id <= currentStep
                        ? variant === 'onboarding'
                          ? "text-indigo-600"
                          : "text-red-600"
                        : "text-gray-500"
                    )}
                  >
                    {step.title}
                  </span>
                  <span className="block text-xs text-gray-500">
                    {step.description}
                  </span>
                </div>
                {step.id < currentStep && (
                  <div
                    className={cn(
                      "absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center",
                      variant === 'onboarding' ? "bg-green-500" : "bg-orange-500"
                    )}
                  >
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
