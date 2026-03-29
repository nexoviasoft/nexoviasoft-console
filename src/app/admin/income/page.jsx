"use client";

import React from 'react';
import IncomeList from '@/components/admin/income/IncomeList';
import AppLayout from '@/components/layout/AppLayout';

export default function IncomePage() {
  return (
    <div className="container mx-auto">

      <AppLayout>
        <IncomeList />
      </AppLayout>

    </div>
  );
}
