import React, { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { Task } from '../../types';

interface Props {
  task: Task;
  availableTasks: Task[];
  onSave: (dependencies: string[]) => void;
  onClose: () => void;
}

export default function TaskDependencyModal({ task, availableTasks, onSave, onClose }: Props) {
  const [selectedDeps, setSelectedDeps] = useState<string[]>(
    task.dependencies || []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(selectedDeps);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Task Dependencies
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-500">
                  Select tasks that must be completed before "{task.title}" can start:
                </p>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {availableTasks
                  .filter(t => t.id !== task.id)
                  .map(availableTask => (
                    <label
                      key={availableTask.id}
                      className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        checked={selectedDeps.includes(availableTask.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedDeps([...selectedDeps, availableTask.id]);
                          } else {
                            setSelectedDeps(selectedDeps.filter(id => id !== availableTask.id));
                          }
                        }}
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {availableTask.title}
                        </p>
                        <div className="flex items-center mt-1">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            availableTask.priority === 'high'
                              ? 'bg-red-100 text-red-800'
                              : availableTask.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {availableTask.priority}
                          </span>
                          {availableTask.status === 'completed' && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Completed
                            </span>
                          )}
                        </div>
                      </div>
                    </label>
                  ))}
              </div>

              {selectedDeps.length > 0 && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Selected Dependencies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDeps.map(depId => {
                      const depTask = availableTasks.find(t => t.id === depId);
                      return depTask ? (
                        <span
                          key={depId}
                          className="inline-flex items-center px-2 py-1 rounded-md bg-indigo-100 text-indigo-800 text-xs"
                        >
                          <ArrowRight className="w-3 h-3 mr-1" />
                          {depTask.title}
                          <button
                            type="button"
                            onClick={() => setSelectedDeps(selectedDeps.filter(id => id !== depId))}
                            className="ml-1 text-indigo-600 hover:text-indigo-700"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Save Dependencies
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}