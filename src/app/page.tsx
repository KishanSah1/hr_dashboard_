import { Suspense } from 'react';
import { DashboardLayout } from '../components/layout/dashboard-layout';
import { DashboardSkeleton } from '../components/dashboard/dashboard-skeleton';
import { DashboardContent } from '../components/dashboard/dashboard-content';
// import { DashboardLayout } from '@/components/layout/dashboard-layout';
// import { DashboardContent } from '@/components/dashboard/dashboard-content';
// import { DashboardSkeleton } from '@/components/dashboard/dashboard-skeleton';

export default function Home() {
  return (
    <DashboardLayout>
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </DashboardLayout>
  );
}