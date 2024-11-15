import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AccountSettings from '../components/config/AccountSettings';
import DepartmentSettings from '../components/config/DepartmentSettings';
import HardwareSettings from '../components/config/HardwareSettings';

export default function CompanyConfig() {
  return (
    <Routes>
      <Route path="/" element={<AccountSettings />} />
      <Route path="/departments" element={<DepartmentSettings />} />
      <Route path="/hardware" element={<HardwareSettings />} />
    </Routes>
  );
}