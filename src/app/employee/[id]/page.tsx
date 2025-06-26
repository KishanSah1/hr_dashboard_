import { Suspense } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { EmployeeDetail } from '@/components/employee/employee-detail';
import { EmployeeDetailSkeleton } from '@/components/employee/employee-detail-skeleton';

interface EmployeePageProps {
  params: {
    id: string;
  };
}

export default function EmployeePage({ params }: EmployeePageProps) {
  return (
    <DashboardLayout>
      <Suspense fallback={<EmployeeDetailSkeleton />}>
        <EmployeeDetail employeeId={params.id} />
      </Suspense>
    </DashboardLayout>
  );
}