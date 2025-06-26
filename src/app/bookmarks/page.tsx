import { Suspense } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { BookmarksContent } from '@/components/bookmarks/bookmarks-content';
import { BookmarksSkeleton } from '@/components/bookmarks/bookmarks-skeleton';

export default function BookmarksPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<BookmarksSkeleton />}>
        <BookmarksContent />
      </Suspense>
    </DashboardLayout>
  );
}