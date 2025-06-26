'use client';

import { Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Project } from '@/types/employee';

interface EmployeeProjectsProps {
  projects: Project[];
}

export function EmployeeProjects({ projects }: EmployeeProjectsProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'planning':
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'planning':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (projects.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No projects assigned yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <Card key={project.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{project.name}</CardTitle>
              <div className="flex items-center gap-2">
                {getStatusIcon(project.status)}
                <Badge className={getStatusColor(project.status)}>
                  {project.status.replace('-', ' ')}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              {project.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-300">
                  Started: {new Date(project.startDate).toLocaleDateString()}
                </span>
              </div>
              
              {project.endDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-300">
                    Ended: {new Date(project.endDate).toLocaleDateString()}
                  </span>
                </div>
              )}
              
              <div>
                <Badge variant="outline">{project.role}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}