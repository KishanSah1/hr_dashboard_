'use client';

import { motion } from 'framer-motion';
import { Bookmark, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { EmployeeCard } from '../dashboard/employee-card';
import { useBookmarks } from '@/hooks/useBookmarks';

export function BookmarksContent() {
  const { bookmarkedEmployees, removeBookmark } = useBookmarks();

  const handleRemoveAll = () => {
    bookmarkedEmployees.forEach(employee => {
      removeBookmark(employee.id);
    });
  };

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
            Bookmarked Employees
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Your saved employee profiles
          </p>
        </div>
        {bookmarkedEmployees.length > 0 && (
          <Button variant="outline" onClick={handleRemoveAll}>
            <X className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      {bookmarkedEmployees.length === 0 ? (
        <Card className="glass-effect">
          <CardContent className="py-12 text-center">
            <Bookmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No bookmarks yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Start bookmarking employees from the main dashboard to see them here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bookmarkedEmployees.map((employee, index) => (
            <motion.div
              key={employee.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <EmployeeCard employee={employee} />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}