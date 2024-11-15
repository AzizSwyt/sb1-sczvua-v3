import React from 'react';
import { Routes, Route } from 'react-router-dom';
import OffboardingProcess from '../components/offboarding/OffboardingProcess';
import OffboardingList from '../components/offboarding/OffboardingList';

export default function Offboarding() {
  return (
    <Routes>
      <Route path="/" element={<OffboardingList />} />
      <Route path="/new" element={<OffboardingProcess />} />
      <Route path="/:id" element={<OffboardingProcess />} />
    </Routes>
  );
}