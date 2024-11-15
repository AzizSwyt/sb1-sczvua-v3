import React from 'react';
import { Routes, Route } from 'react-router-dom';
import OnboardingProcess from '../components/onboarding/OnboardingProcess';
import OnboardingList from '../components/onboarding/OnboardingList';

export default function Onboarding() {
  return (
    <Routes>
      <Route path="/" element={<OnboardingList />} />
      <Route path="/new" element={<OnboardingProcess />} />
      <Route path="/:id" element={<OnboardingProcess />} />
    </Routes>
  );
}