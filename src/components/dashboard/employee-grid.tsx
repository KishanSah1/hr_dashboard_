'use client';

import { motion } from 'framer-motion';
import { EmployeeCard } from './employee-card';
import { useSearch } from '@/hooks/useSearch';

export function EmployeeGrid() {
  const { paginatedEmployees } = useSearch();

  if (paginatedEmployees.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          No employees found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {paginatedEmployees.map((employee, index) => (
        <motion.div
          key={employee.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <EmployeeCard employee={employee} />
        </motion.div>
      ))}
    </motion.div>
  );
}