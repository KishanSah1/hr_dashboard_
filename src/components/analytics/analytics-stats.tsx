'use client';

import { useHRContext } from '@/contexts/hr-context';
import { motion } from 'framer-motion';
import { Award, Star, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export function AnalyticsStats() {
  const { state } = useHRContext();

  const totalEmployees = state.employees.length;
  const averageRating = state.employees.reduce((sum, emp) => sum + emp.rating, 0) / totalEmployees;
  const highPerformers = state.employees.filter(emp => emp.rating >= 4).length;
  const departmentCount = state.departments.length;

  const stats = [
    {
      title: 'Total Employees',
      value: totalEmployees,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      change: '+5.2%',
      changeColor: 'text-green-600',
    },
    {
      title: 'Average Rating',
      value: averageRating.toFixed(1),
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
      change: '+0.3',
      changeColor: 'text-green-600',
    },
    {
      title: 'High Performers',
      value: highPerformers,
      icon: Award,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      change: '+12.5%',
      changeColor: 'text-green-600',
    },
    {
      title: 'Departments',
      value: departmentCount,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      change: '0%',
      changeColor: 'text-gray-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="glass-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.changeColor} flex items-center mt-1`}>
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}