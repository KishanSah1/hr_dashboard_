'use client';

import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useSearch } from '@/hooks/useSearch';
import { useHRContext } from '@/contexts/hr-context';

export function FilterControls() {
  const { state } = useHRContext();
  const {
    selectedDepartments,
    selectedRatings,
    setSelectedDepartments,
    setSelectedRatings,
  } = useSearch();

  const handleDepartmentChange = (department: string) => {
    if (selectedDepartments.includes(department)) {
      setSelectedDepartments(selectedDepartments.filter(d => d !== department));
    } else {
      setSelectedDepartments([...selectedDepartments, department]);
    }
  };

  const handleRatingChange = (rating: string) => {
    const ratingNum = parseInt(rating);
    if (selectedRatings.includes(ratingNum)) {
      setSelectedRatings(selectedRatings.filter(r => r !== ratingNum));
    } else {
      setSelectedRatings([...selectedRatings, ratingNum]);
    }
  };

  const clearAllFilters = () => {
    setSelectedDepartments([]);
    setSelectedRatings([]);
  };

  const hasActiveFilters = selectedDepartments.length > 0 || selectedRatings.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-4"
    >
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Filters:
          </span>
        </div>

        <Select onValueChange={handleDepartmentChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            {state.departments.map((dept) => (
              <SelectItem key={dept.id} value={dept.name}>
                {dept.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={handleRatingChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Rating" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5].map((rating) => (
              <SelectItem key={rating} value={rating.toString()}>
                {rating} Star{rating > 1 ? 's' : ''}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={clearAllFilters}>
            <X className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {selectedDepartments.map((dept) => (
            <Badge key={dept} variant="secondary" className="gap-1">
              {dept}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleDepartmentChange(dept)}
              />
            </Badge>
          ))}
          {selectedRatings.map((rating) => (
            <Badge key={rating} variant="secondary" className="gap-1">
              {rating} Star{rating > 1 ? 's' : ''}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleRatingChange(rating.toString())}
              />
            </Badge>
          ))}
        </div>
      )}
    </motion.div>
  );
}