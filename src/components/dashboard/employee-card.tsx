'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Eye, 
  Bookmark, 
  TrendingUp, 
  Mail, 
  Phone,
  MapPin,
  Star
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Employee } from '@/types/employee';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useHRContext } from '@/contexts/hr-context';
import { toast } from 'sonner';

interface EmployeeCardProps {
  employee: Employee;
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { state } = useHRContext();
  const [isHovered, setIsHovered] = useState(false);

  const department = state.departments.find(d => d.name === employee.department);

  const handleBookmark = () => {
    toggleBookmark(employee.id);
    toast.success(
      isBookmarked(employee.id) 
        ? 'Employee removed from bookmarks' 
        : 'Employee added to bookmarks'
    );
  };

  const handlePromote = () => {
    toast.success(`${employee.firstName} ${employee.lastName} has been promoted!`);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
          ({rating})
        </span>
      </div>
    );
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="glass-effect h-full transition-all duration-300 hover:shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={employee.image} alt={employee.firstName} />
                <AvatarFallback>
                  {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">
                  {employee.firstName} {employee.lastName}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {employee.position}
                </p>
              </div>
            </div>
            <Badge 
              variant="secondary" 
              style={{ backgroundColor: `${department?.color}20`, color: department?.color }}
            >
              {employee.department}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Mail className="h-4 w-4 mr-2" />
              {employee.email}
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Phone className="h-4 w-4 mr-2" />
              {employee.phone}
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <MapPin className="h-4 w-4 mr-2" />
              {employee.address.city}, {employee.address.state}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Performance Rating</p>
            {renderStars(employee.rating)}
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex space-x-2">
              <Link href={`/employee/${employee.id}`}>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  View
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={handleBookmark}
                className={`flex items-center gap-2 ${
                  isBookmarked(employee.id) 
                    ? 'bg-yellow-100 text-yellow-700 border-yellow-300' 
                    : ''
                }`}
              >
                <Bookmark 
                  className={`h-4 w-4 ${
                    isBookmarked(employee.id) ? 'fill-current' : ''
                  }`} 
                />
                {isBookmarked(employee.id) ? 'Saved' : 'Save'}
              </Button>
            </div>
            <Button
              size="sm"
              onClick={handlePromote}
              className="flex items-center gap-2"
            >
              <TrendingUp className="h-4 w-4" />
              Promote
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}