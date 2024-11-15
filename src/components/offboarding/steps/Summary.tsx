import React from 'react';
import { Download, ArrowRight, Package, Calendar, AppWindow, Check, AlertCircle } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface Props {
  data: any;
  onBack: () => void;
  onComplete: () => void;
}

export default function Summary({ data, onBack, onComplete }: Props) {
  const getStatusBadge = (status: string | undefined) => {
    if (!status) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          <AlertCircle className="w-3 h-3 mr-1" />
          Unknown
        </span>
      );
    }

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        status === 'completed'
          ? 'bg-green-100 text-green-800'
          : status === 'in_progress'
          ? 'bg-yellow-100 text-yellow-800'
          : 'bg-gray-100 text-gray-800'
      }`}>
        {status === 'completed' ? (
          <Check className="w-3 h-3 mr-1" />
        ) : (
          <AlertCircle className="w-3 h-3 mr-1" />
        )}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const exportToPDF = async () => {
    const element = document.getElementById('summary-content');
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      useCORS: true
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`offboarding-summary-${data?.employee?.lastName || 'employee'}.pdf`);
  };

  return (
    <div className="max-w-4xl mx-auto" id="summary-content">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Offboarding Summary</h2>
            <p className="mt-1 text-sm text-gray-500">Review and confirm the offboarding details</p>
          </div>
          <button
            onClick={exportToPDF}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center text-red-600 mb-2">
              <Calendar className="w-5 h-5 mr-2" />
              <span className="font-medium">Last Day</span>
            </div>
            <p className="text-2xl font-semibold text-red-900">
              {new Date(data?.employee?.lastDay || '').toLocaleDateString()}
            </p>
            <p className="text-sm text-red-600">Offboarding Date</p>
          </div>

          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center text-orange-600 mb-2">
              <Package className="w-5 h-5 mr-2" />
              <span className="font-medium">Devices</span>
            </div>
            <p className="text-2xl font-semibold text-orange-900">
              {data?.devices?.filter((d: any) => d.action !== 'nothing').length || 0}
            </p>
            <p className="text-sm text-orange-600">Devices to Process</p>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center text-purple-600 mb-2">
              <AppWindow className="w-5 h-5 mr-2" />
              <span className="font-medium">Apps</span>
            </div>
            <p className="text-2xl font-semibold text-purple-900">
              {Object.keys(data?.apps || {}).length}
            </p>
            <p className="text-sm text-purple-600">Apps to Deprovision</p>
          </div>
        </div>
      </div>

      {/* Employee Information */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Employee Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium text-gray-500">Name</p>
            <p className="mt-1 text-sm text-gray-900">
              {data?.employee?.firstName || 'N/A'} {data?.employee?.lastName || ''}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="mt-1 text-sm text-gray-900">{data?.employee?.email || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Department</p>
            <p className="mt-1 text-sm text-gray-900">{data?.employee?.department || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Role</p>
            <p className="mt-1 text-sm text-gray-900">{data?.employee?.role || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Last Day</p>
            <p className="mt-1 text-sm text-gray-900">{data?.employee?.lastDay || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Manager</p>
            <p className="mt-1 text-sm text-gray-900">{data?.employee?.manager || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Device Deprovisioning */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Device Deprovisioning</h3>
        <div className="space-y-4">
          {data?.devices?.map((device: any, index: number) => (
            <div key={device?.id || index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <img
                  src={device?.image || '/placeholder.png'}
                  alt={device?.name || 'Device'}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">{device?.name || 'Unknown Device'}</p>
                  <p className="text-xs text-gray-500">{device?.specs || ''}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  device?.action === 'stock'
                    ? 'bg-green-100 text-green-800'
                    : device?.action === 'sell'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {device?.action === 'stock' ? 'Moving to Stock' :
                   device?.action === 'sell' ? 'Selling' : 'No Action'}
                </span>
                {device?.condition && (
                  <p className="mt-1 text-xs text-gray-500">
                    Condition: {device?.condition}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* App Deprovisioning */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">App & License Deprovisioning</h3>
        <div className="space-y-4">
          {Object.entries(data?.apps || {}).map(([appId, app]: [string, any]) => (
            <div key={appId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <img
                  src={app?.icon || '/default-icon.png'}
                  alt={app?.name || 'App'}
                  className="w-12 h-12 rounded-lg"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">{app?.name || 'Unknown App'}</p>
                  <div className="mt-1 flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      Scheduled: {app?.scheduledDate || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
              {getStatusBadge(app?.status)}
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={onComplete}
          className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Complete Offboarding
          <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
