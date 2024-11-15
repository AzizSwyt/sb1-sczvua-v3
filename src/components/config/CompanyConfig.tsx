import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AccountSettings from './account/AccountSettings';
import DepartmentSettings from './account/DepartmentSettings';
import HardwareSettings from './account/HardwareSettings';

export default function CompanyConfig() {
  return (
    <Routes>
      <Route path="/" element={<AccountSettings />} />
      <Route path="/departments" element={<DepartmentSettings />} />
      <Route path="/hardware" element={<HardwareSettings />} />
    </Routes>
  );
}