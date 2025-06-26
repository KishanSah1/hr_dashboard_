import { Suspense } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { AnalyticsContent } from '@/components/analytics/analytics-content';
import { AnalyticsSkeleton } from '@/components/analytics/analytics-skeleton';

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<AnalyticsSkeleton />}>
        <AnalyticsContent />
      </Suspense>
    </DashboardLayout>
  );
}