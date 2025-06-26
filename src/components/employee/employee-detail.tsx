'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, DollarSign } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Employee } from '@/types/employee';
import { fetchEmployeeById } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { EmployeeOverview } from './employee-overview';
import { EmployeeProjects } from './employee-projects';
import { EmployeeFeedback } from './employee-feedback';
import { LoadingSpinner } from '../ui/loading-spinner';

interface EmployeeDetailProps {
  employeeId: string;
}

export function EmployeeDetail({ employeeId }: EmployeeDetailProps) {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadEmployee = async () => {
      try {
        const data = await fetchEmployeeById(employeeId);
        setEmployee(data);
      } catch (error) {
        console.error('Error loading employee:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEmployee();
  }, [employeeId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Employee not found.</p>
        <Button onClick={() => router.back()} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Employee Details
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Complete profile and performance information
          </p>
        </div>
      </div>

      <Card className="glass-effect">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={employee.image} alt={employee.firstName} />
                <AvatarFallback className="text-2xl">
                  {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">
                  {employee.firstName} {employee.lastName}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {employee.position}
                </p>
                <Badge variant="secondary" className="mt-2">
                  {employee.department}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Joined {new Date(employee.joinDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">
                  ${employee.salary.toLocaleString()}/year
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <EmployeeOverview employee={employee} />
        </TabsContent>
        
        <TabsContent value="projects">
          <EmployeeProjects projects={employee.projects} />
        </TabsContent>
        
        <TabsContent value="feedback">
          <EmployeeFeedback feedback={employee.feedback} />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}