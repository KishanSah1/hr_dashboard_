'use client';

import { Star, Award, Target, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Employee } from '@/types/employee';

interface EmployeeOverviewProps {
  employee: Employee;
}

export function EmployeeOverview({ employee }: EmployeeOverviewProps) {
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
        <span className="ml-2 text-lg font-semibold">{rating}/5</span>
      </div>
    );
  };

  const getPerformanceTrend = () => {
    if (employee.performanceHistory.length < 2) return 'stable';
    const latest = employee.performanceHistory[0].rating;
    const previous = employee.performanceHistory[1].rating;
    if (latest > previous) return 'improving';
    if (latest < previous) return 'declining';
    return 'stable';
  };

  const performanceTrend = getPerformanceTrend();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            {renderStars(employee.rating)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {employee.projects.filter(p => p.status === 'in-progress').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {employee.projects.length} total projects
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance Trend</CardTitle>
            <TrendingUp className={`h-4 w-4 ${
              performanceTrend === 'improving' ? 'text-green-600' :
              performanceTrend === 'declining' ? 'text-red-600' : 'text-gray-600'
            }`} />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold capitalize">{performanceTrend}</div>
            <p className="text-xs text-muted-foreground">
              Based on recent reviews
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Bio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300">{employee.bio}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {employee.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {employee.performanceHistory.map((record) => (
              <div key={record.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{record.period}</h4>
                  <div className="flex items-center gap-2">
                    {renderStars(record.rating)}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium text-green-600 mb-2">Achievements</h5>
                    <ul className="space-y-1">
                      {record.achievements.map((achievement, index) => (
                        <li key={index} className="text-gray-600 dark:text-gray-300">
                          • {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-600 mb-2">Goals</h5>
                    <ul className="space-y-1">
                      {record.goals.map((goal, index) => (
                        <li key={index} className="text-gray-600 dark:text-gray-300">
                          • {goal}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-orange-600 mb-2">Areas for Improvement</h5>
                    <ul className="space-y-1">
                      {record.areas_for_improvement.map((area, index) => (
                        <li key={index} className="text-gray-600 dark:text-gray-300">
                          • {area}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}