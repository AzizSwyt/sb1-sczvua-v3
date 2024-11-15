import React, { useState } from 'react';
import { Layout, Users, Settings, LogOut } from 'lucide-react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import Offboarding from './pages/Offboarding';
import CompanyConfig from './pages/CompanyConfig';

function App() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const NavItem = ({ to, icon: Icon, children }: any) => {
    const isActive = location.pathname.startsWith(to);
    return (
      <NavLink
        to={to}
        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
          isActive
            ? 'bg-indigo-50 text-indigo-600'
            : 'text-gray-600 hover:bg-gray-50'
        }`}
      >
        <Icon className="w-5 h-5" />
        <span className="font-medium">{children}</span>
      </NavLink>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center space-x-3 px-6 py-4 border-b border-gray-200">
            <Layout className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-semibold text-gray-900">Swyt HR</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            <NavItem to="/onboarding" icon={Users}>Onboarding</NavItem>
            <NavItem to="/offboarding" icon={LogOut}>Offboarding</NavItem>
            <NavItem to="/config" icon={Settings}>Settings</NavItem>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <img
                src="https://media.licdn.com/dms/image/v2/D4D03AQF99sZQjc_3dw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1712298627060?e=1736985600&v=beta&t=v_98GzsPC2ftFVqW1agPKYAHybd2moGQsDMmNc2PcUA"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">Aziz Jaouhari</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-200 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md hover:bg-gray-50 lg:hidden"
        >
          <Layout className="w-5 h-5 text-gray-600" />
        </button>

        {/* Routes */}
        <div className="p-8">
          <Routes>
            <Route path="/onboarding/*" element={<Onboarding />} />
            <Route path="/offboarding/*" element={<Offboarding />} />
            <Route path="/config/*" element={<CompanyConfig />} />
            <Route path="*" element={<Onboarding />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

// Add this default export
export default App;
