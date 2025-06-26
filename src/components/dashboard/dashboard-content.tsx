'use client';

import { motion } from 'framer-motion';
import { EmployeeGrid } from './employee-grid';
import { DashboardStats } from './dashboard-stats';
import { FilterControls } from './filter-controls';
import { Pagination } from './pagination';
import { CreateEmployeeDialog } from './create-employee-dialog';
import { useHRContext } from '@/contexts/hr-context';

export function DashboardContent() {
  const { state } = useHRContext();

  if (state.loading) {
    return <div>Loading...</div>;
  }

  if (state.error) {
    return <div>Error: {state.error}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Employee Dashboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Manage your team and track performance
          </p>
        </div>
        <CreateEmployeeDialog />
      </div>

      <DashboardStats />
      <FilterControls />
      <EmployeeGrid />
      <Pagination />
    </motion.div>
  );
}