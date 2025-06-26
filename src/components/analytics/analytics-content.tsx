'use client';

import { motion } from 'framer-motion';
import { DepartmentChart } from './department-chart';
import { PerformanceChart } from './performance-chart';
import { BookmarkTrendsChart } from './bookmark-trends-chart';
import { AnalyticsStats } from './analytics-stats';

export function AnalyticsContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Analytics Dashboard
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Insights and trends from your HR data
        </p>
      </div>

      <AnalyticsStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DepartmentChart />
        <PerformanceChart />
      </div>

      <BookmarkTrendsChart />
    </motion.div>
  );
}